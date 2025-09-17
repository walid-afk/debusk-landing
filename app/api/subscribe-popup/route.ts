import { NextRequest, NextResponse } from 'next/server'

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
    console.log('=== API subscribe-popup appelée ===')
    
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

    console.log('Validation OK, appel vers Google Apps Script...')

    // Anti-bot soft delay
    await new Promise(resolve => setTimeout(resolve, 300))

    // URL Google Apps Script (remplacez par votre nouvelle URL si nécessaire)
    const appsScriptUrl = "https://script.google.com/macros/s/AKfycbyJ8uk3CaR6rXl4cff8_9p1a53lP7hNbjAmUyA_gUM/exec"
    
    console.log('URL Google Apps Script:', appsScriptUrl)

    // Préparation des données pour Google Apps Script
    const urlParams = new URLSearchParams({
      email: email.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      userType: userType,
      profession: profession ? profession.trim() : '',
      ts: new Date().toISOString(),
      source: 'popup'
    })
    
    const fullUrl = `${appsScriptUrl}?${urlParams}`
    console.log('URL complète:', fullUrl)
    
    const response = await fetch(fullUrl, {
      method: 'GET',
    })

    console.log('Réponse Google Apps Script:', response.status, response.statusText)

    if (!response.ok) {
      console.error('Erreur Google Apps Script:', response.status, response.statusText)
      return NextResponse.json(
        { success: false, error: 'Erreur serveur' },
        { status: 500 }
      )
    }

    // Récupérer le texte brut pour voir ce qui est retourné
    const responseText = await response.text()
    console.log('Réponse brute Google Apps Script:', responseText.substring(0, 500))

    // Essayer de parser en JSON
    let result
    try {
      result = JSON.parse(responseText)
      console.log('Résultat JSON Google Apps Script:', result)
    } catch (jsonError) {
      console.error('Erreur parsing JSON:', jsonError)
      console.log('La réponse n\'est pas du JSON valide')
      
      // Si ce n'est pas du JSON, on considère que c'est un succès si le status est 200
      if (response.status === 200) {
        console.log('Status 200, on considère comme succès (réponse HTML)')
        return NextResponse.json({ success: true })
      } else {
        return NextResponse.json(
          { success: false, error: 'Réponse invalide du serveur' },
          { status: 500 }
        )
      }
    }

    if (result.ok) {
      console.log('Succès!')
      return NextResponse.json({ success: true })
    } else {
      console.error('Erreur Apps Script:', result)
      return NextResponse.json(
        { success: false, error: 'Erreur traitement' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Erreur API subscribe-popup:', error)
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace')
    return NextResponse.json(
      { success: false, error: 'Erreur interne' },
      { status: 500 }
    )
  }
}
