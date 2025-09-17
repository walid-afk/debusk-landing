// Script de test pour l'API subscribe-service-account
// Usage: node test-api.js

const testData = {
  userType: "startup",
  firstName: "Test",
  lastName: "User",
  email: "test@example.com",
  profession: "Developer"
}

async function testAPI() {
  try {
    console.log('🧪 Test de l\'API subscribe-service-account...')
    console.log('📤 Données envoyées:', testData)
    
    const response = await fetch('http://localhost:3000/api/subscribe-service-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    })

    const result = await response.json()
    
    console.log('📥 Réponse reçue:')
    console.log('Status:', response.status)
    console.log('Success:', result.success)
    console.log('Message:', result.message)
    
    if (result.success) {
      console.log('✅ Test réussi !')
      console.log('📊 Données sauvegardées:', result.data)
    } else {
      console.log('❌ Test échoué !')
      console.log('🔍 Erreur:', result.error)
    }
    
  } catch (error) {
    console.error('💥 Erreur lors du test:', error.message)
  }
}

// Vérifier que le serveur est démarré
testAPI()
