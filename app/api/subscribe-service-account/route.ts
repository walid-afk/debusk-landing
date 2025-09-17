import { NextRequest, NextResponse } from 'next/server'
import { JWT } from 'google-auth-library'

interface RequestBody {
  userType: string
  firstName: string
  lastName: string
  email: string
  profession: string
}

// Validation email côté serveur
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
  return emailRegex.test(email)
}

export async function POST(request: NextRequest) {
  try {
    console.log('=== API subscribe-service-account appelée ===')
    
    // Parse du body JSON
    const body: RequestBody = await request.json()
    console.log('Body reçu:', body)
    
    const { userType, firstName, lastName, email, profession } = body

    // Validation des données
    if (!email || typeof email !== 'string') {
      console.log('Erreur: Email requis')
      return NextResponse.json(
        { success: false, error: 'Email requis' },
        { status: 400 }
      )
    }

    if (!firstName || !lastName || !userType) {
      console.log('Erreur: Champs requis manquants', { firstName, lastName, userType })
      return NextResponse.json(
        { success: false, error: 'Tous les champs requis doivent être remplis' },
        { status: 400 }
      )
    }

    // Validation email
    if (!validateEmail(email.trim())) {
      console.log('Erreur: Email invalide', email)
      return NextResponse.json(
        { success: false, error: 'Format email invalide' },
        { status: 400 }
      )
    }

    console.log('Validation OK, authentification Service Account...')

    // Anti-bot soft delay
    await new Promise(resolve => setTimeout(resolve, 300))

    // Configuration Service Account
    const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID || ''
    const SHEET_NAME = 'EMAIL DEBUSK'
    
    // Service Account credentials via variables d'environnement
    const serviceAccountKey = {
      "type": process.env.GOOGLE_SERVICE_ACCOUNT_TYPE || "service_account",
      "project_id": process.env.GOOGLE_PROJECT_ID || "",
      "private_key_id": process.env.GOOGLE_PRIVATE_KEY_ID || "",
      "private_key": process.env.GOOGLE_PRIVATE_KEY || "",
      "client_email": process.env.GOOGLE_CLIENT_EMAIL || "",
      "client_id": process.env.GOOGLE_CLIENT_ID || "",
      "auth_uri": process.env.GOOGLE_AUTH_URI || "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": process.env.GOOGLE_CLIENT_X509_CERT_URL || "",
      "universe_domain": "googleapis.com"
    }

    // Créer le client JWT
    const jwtClient = new JWT({
      email: serviceAccountKey.client_email,
      key: serviceAccountKey.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })

    // Authentifier
    await jwtClient.authorize()
    console.log('Service Account authentifié avec succès')

    // Préparer les données pour Google Sheets
    const timestamp = new Date().toISOString()
    const rowData = [
      timestamp,
      email.trim(),
      firstName.trim(),
      lastName.trim(),
      userType,
      profession ? profession.trim() : '',
      'popup'
    ]

    // URL de l'API Google Sheets
    const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A:G:append?valueInputOption=RAW`

    console.log('URL Google Sheets API:', sheetsUrl)
    console.log('Données à envoyer:', rowData)

    // Appel vers l'API Google Sheets avec authentification
    const response = await fetch(sheetsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtClient.credentials.access_token}`
      },
      body: JSON.stringify({
        values: [rowData]
      })
    })

    console.log('Réponse Google Sheets API:', response.status, response.statusText)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Erreur Google Sheets API:', errorText)
      return NextResponse.json(
        { success: false, error: 'Erreur Google Sheets: ' + errorText },
        { status: 500 }
      )
    }

    const result = await response.json()
    console.log('Résultat Google Sheets API:', result)

    // Afficher les données dans la console
    console.log('=== NOUVELLE INSCRIPTION ===')
    console.log('Type:', userType)
    console.log('Nom:', firstName, lastName)
    console.log('Email:', email)
    console.log('Profession:', profession || 'Non renseignée')
    console.log('Timestamp:', timestamp)
    console.log('========================')

    return NextResponse.json({ 
      success: true, 
      message: 'Données ajoutées dans Google Sheets avec succès',
      data: {
        timestamp,
        userType,
        firstName,
        lastName,
        email,
        profession
      }
    })

  } catch (error) {
    console.error('Erreur API subscribe-service-account:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur interne: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    )
  }
}
