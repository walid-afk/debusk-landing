import { NextRequest, NextResponse } from 'next/server'

interface RequestBody {
  userType: string
  firstName: string
  lastName: string
  email: string
  profession: string
  company: string // honeypot
}

export async function POST(request: NextRequest) {
  try {
    console.log('=== API subscribe-fallback appelée (GitHub Pages) ===')

    const body: RequestBody = await request.json()
    const { userType, firstName, lastName, email, profession, company } = body

    // Simulate successful processing
    console.log('Simulation de l\'inscription réussie:', { userType, firstName, lastName, email, profession })

    return NextResponse.json({
      success: true,
      message: 'Inscription simulée avec succès (GitHub Pages)',
      data: {
        userType,
        firstName,
        lastName,
        email,
        profession
      }
    })
  } catch (error) {
    console.error('Erreur API subscribe-fallback:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur interne de fallback' },
      { status: 500 }
    )
  }
}
