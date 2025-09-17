import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'

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
    console.log('=== API subscribe-simple appelée ===')
    
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

    console.log('Validation OK, sauvegarde des données...')

    // Anti-bot soft delay
    await new Promise(resolve => setTimeout(resolve, 300))

    // Préparer les données à sauvegarder
    const dataToSave = {
      timestamp: new Date().toISOString(),
      userType: userType,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      profession: profession ? profession.trim() : '',
      source: 'popup'
    }

    // Chemin vers le fichier de données
    const dataPath = join(process.cwd(), 'data', 'subscriptions.json')
    
    try {
      // Lire les données existantes
      const existingData = await readFile(dataPath, 'utf-8')
      const allData = JSON.parse(existingData)
      allData.push(dataToSave)
      
      // Sauvegarder les nouvelles données
      await writeFile(dataPath, JSON.stringify(allData, null, 2))
      console.log('Données sauvegardées dans le fichier JSON')
    } catch (error) {
      // Si le fichier n'existe pas, le créer
      const dataDir = join(process.cwd(), 'data')
      try {
        await writeFile(dataPath, JSON.stringify([dataToSave], null, 2))
        console.log('Nouveau fichier de données créé')
      } catch (dirError) {
        console.error('Erreur création fichier:', dirError)
        return NextResponse.json(
          { success: false, error: 'Erreur sauvegarde' },
          { status: 500 }
        )
      }
    }

    // Afficher les données dans la console (pour debug)
    console.log('=== NOUVELLE INSCRIPTION ===')
    console.log('Type:', dataToSave.userType)
    console.log('Nom:', dataToSave.firstName, dataToSave.lastName)
    console.log('Email:', dataToSave.email)
    console.log('Profession:', dataToSave.profession || 'Non renseignée')
    console.log('Timestamp:', dataToSave.timestamp)
    console.log('========================')

    return NextResponse.json({ 
      success: true, 
      message: 'Données sauvegardées avec succès',
      data: dataToSave
    })

  } catch (error) {
    console.error('Erreur API subscribe-simple:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur interne' },
      { status: 500 }
    )
  }
}
