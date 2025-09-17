import { NextRequest, NextResponse } from 'next/server'

interface RequestBody {
  email: string
  company: string // honeypot
}

// Validation email côté serveur
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
  return emailRegex.test(email)
}

export async function POST(request: NextRequest) {
  try {
    console.log('=== API subscribe-email appelée ===')
    
    // Parse du body JSON
    const body: RequestBody = await request.json()
    console.log('Body reçu:', body)
    
    const { email, company } = body

    // Validation des données
    if (!email || typeof email !== 'string') {
      console.log('Erreur: Email requis')
      return NextResponse.json(
        { success: false, error: 'Email requis' },
        { status: 400 }
      )
    }

    // Vérification honeypot (si rempli, c'est un bot)
    if (company && company.trim() !== '') {
      console.log('Erreur: Honeypot détecté')
      return NextResponse.json(
        { success: false, error: 'Requête suspecte' },
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

    console.log('Validation OK, appel vers Google Sheets API...')

    // Anti-bot soft delay
    await new Promise(resolve => setTimeout(resolve, 300))

    // Configuration Google Sheets
    const SPREADSHEET_ID = '1PSmCjyHRvjLP1DemusnfQJ5jJDjmf9ShfbvyKzwyIjE'
    const SHEET_NAME = 'EMAIL DEBUSK'
    const API_KEY = process.env.GOOGLE_SHEETS_API_KEY

    if (!API_KEY) {
      console.error('GOOGLE_SHEETS_API_KEY non configurée')
      return NextResponse.json(
        { success: false, error: 'Configuration manquante' },
        { status: 500 }
      )
    }

    // Préparer les données pour Google Sheets (juste email + timestamp)
    const timestamp = new Date().toISOString()
    const rowData = [
      timestamp,
      email.trim(),
      'liste-attente' // source
    ]

    // URL de l'API Google Sheets
    const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A:C:append?valueInputOption=RAW&key=${API_KEY}`

    console.log('URL Google Sheets API:', sheetsUrl)
    console.log('Données à envoyer:', rowData)

    // Appel vers l'API Google Sheets
    const response = await fetch(sheetsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
        { success: false, error: 'Erreur Google Sheets' },
        { status: 500 }
      )
    }

    const result = await response.json()
    console.log('Résultat Google Sheets API:', result)

    // Afficher les données dans la console
    console.log('=== NOUVELLE INSCRIPTION ===')
    console.log('Email:', email)
    console.log('Timestamp:', timestamp)
    console.log('Source: liste-attente')
    console.log('========================')

    return NextResponse.json({ 
      success: true, 
      message: 'Email ajouté dans Google Sheets avec succès',
      data: {
        timestamp,
        email: email.trim(),
        source: 'liste-attente'
      }
    })

  } catch (error) {
    console.error('Erreur API subscribe-email:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur interne' },
      { status: 500 }
    )
  }
}

