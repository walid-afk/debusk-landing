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
    // Parse du body JSON
    const body: RequestBody = await request.json()
    const { email, company } = body

    // Validation des données
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Email requis' },
        { status: 400 }
      )
    }

    // Vérification honeypot (si rempli, c'est un bot)
    if (company && company.trim() !== '') {
      return NextResponse.json(
        { success: false, error: 'Requête suspecte' },
        { status: 400 }
      )
    }

    // Validation email
    if (!validateEmail(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Format email invalide' },
        { status: 400 }
      )
    }

    // Anti-bot soft delay
    await new Promise(resolve => setTimeout(resolve, 300))

    // URL Google Apps Script (temporairement hardcodée)
    const appsScriptUrl = "https://script.google.com/macros/s/AKfycbyJ8uk3CaR6rXl4cff8_9p1a53lP7hNbjAmUyA_gUM/exec"
    
    console.log('URL Apps Script:', appsScriptUrl)

    // Préparation des données pour Google Apps Script
    const payload = {
      email: email.trim(),
      ts: new Date().toISOString(),
      source: 'landing'
    }

    // Appel vers Google Apps Script via paramètres URL
    const urlParams = new URLSearchParams({
      email: payload.email,
      ts: payload.ts,
      source: payload.source
    })
    
    const response = await fetch(`${appsScriptUrl}?${urlParams}`, {
      method: 'GET',
    })

    if (!response.ok) {
      console.error('Erreur Google Apps Script:', response.status, response.statusText)
      return NextResponse.json(
        { success: false, error: 'Erreur serveur' },
        { status: 500 }
      )
    }

    const result = await response.json()

    if (result.ok) {
      return NextResponse.json({ success: true })
    } else {
      console.error('Erreur Apps Script:', result)
      return NextResponse.json(
        { success: false, error: 'Erreur traitement' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Erreur API subscribe:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur interne' },
      { status: 500 }
    )
  }
}

