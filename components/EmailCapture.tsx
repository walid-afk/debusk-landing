'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CheckCircle, AlertCircle } from 'lucide-react'

interface FormData {
  userType: string
  firstName: string
  lastName: string
  email: string
  profession: string
  company: string // honeypot
}

interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error'
  message: string
}

export default function EmailCapture() {
  const [formData, setFormData] = useState<FormData>({ 
    userType: '', 
    firstName: '', 
    lastName: '', 
    email: '', 
    profession: '', 
    company: '' 
  })
  const [formState, setFormState] = useState<FormState>({ status: 'idle', message: '' })

  // Validation email côté client
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation côté client
    if (!formData.email.trim()) {
      setFormState({ status: 'error', message: 'Veuillez saisir votre email' })
      return
    }

    if (!formData.firstName.trim()) {
      setFormState({ status: 'error', message: 'Veuillez saisir votre prénom' })
      return
    }

    if (!formData.lastName.trim()) {
      setFormState({ status: 'error', message: 'Veuillez saisir votre nom' })
      return
    }

    if (!formData.userType) {
      setFormState({ status: 'error', message: 'Veuillez sélectionner votre profil' })
      return
    }

    if (!validateEmail(formData.email)) {
      setFormState({ status: 'error', message: 'Format d\'email invalide' })
      return
    }

    // Vérification honeypot (si rempli, c'est un bot)
    if (formData.company.trim()) {
      setFormState({ status: 'error', message: 'Oups, réessayez dans un instant.' })
      return
    }

    setFormState({ status: 'loading', message: '' })

    try {
      const response = await fetch('/api/subscribe-sheets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userType: formData.userType,
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          profession: formData.profession.trim(),
          company: formData.company.trim() // honeypot
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setFormState({ status: 'success', message: 'Merci ! Vous êtes maintenant sur la liste d\'attente ✅' })
        setFormData({ 
          userType: '', 
          firstName: '', 
          lastName: '', 
          email: '', 
          profession: '', 
          company: '' 
        }) // Reset form
      } else {
        setFormState({ status: 'error', message: result.error || 'Oups, réessayez dans un instant.' })
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error)
      setFormState({ status: 'error', message: 'Oups, réessayez dans un instant.' })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Reset error state when user starts typing
    if (formState.status === 'error') {
      setFormState({ status: 'idle', message: '' })
    }
  }

  return (
    <div className="text-center">
          {/* Header */}
          <h2 className="text-2xl font-bold text-black mb-4">
            Rejoignez la liste d'attente
          </h2>
          <p className="text-gray-600 mb-8">
            Soyez parmi les premiers à découvrir Debusk et bénéficiez d'un accès prioritaire 
            avec des avantages exclusifs.
          </p>

          {/* Avantages */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center justify-center space-x-3">
              <CheckCircle className="w-6 h-6 text-black" />
              <span className="text-black">Accès gratuit pendant 3 mois</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <CheckCircle className="w-6 h-6 text-black" />
              <span className="text-black">Accès prioritaire au lancement</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <CheckCircle className="w-6 h-6 text-black" />
              <span className="text-black">Support dédié</span>
            </div>
          </div>

          {/* Formulaire */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Type d'utilisateur */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Type d'utilisateur
                </label>
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  disabled={formState.status === 'loading'}
                  required
                >
                  <option value="" className="text-gray-400">Sélectionnez votre profil</option>
                  <option value="particulier" className="text-black">Particulier</option>
                  <option value="freelance" className="text-black">Freelance</option>
                  <option value="startup" className="text-black">Startup</option>
                  <option value="pme" className="text-black">PME</option>
                  <option value="grande-entreprise" className="text-black">Grande entreprise</option>
                </select>
              </div>

              {/* Prénom et Nom */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Prénom
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Votre prénom"
                    className="w-full px-3 py-2 rounded-lg bg-white text-black placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    disabled={formState.status === 'loading'}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Votre nom"
                    className="w-full px-3 py-2 rounded-lg bg-white text-black placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    disabled={formState.status === 'loading'}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="votre@email.com"
                  className="w-full px-3 py-2 rounded-lg bg-white text-black placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  disabled={formState.status === 'loading'}
                  required
                />
              </div>

              {/* Profession */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Profession (optionnel)
                </label>
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleInputChange}
                  placeholder="Votre profession"
                  className="w-full px-3 py-2 rounded-lg bg-white text-black placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  disabled={formState.status === 'loading'}
                />
              </div>

              {/* Honeypot - champ caché pour les bots */}
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Bouton de soumission */}
              <Button 
                type="submit"
                size="lg" 
                className="w-full bg-black text-white hover:bg-gray-900 disabled:opacity-50 rounded-lg px-4 py-2 font-medium transition-colors"
                disabled={formState.status === 'loading'}
              >
                {formState.status === 'loading' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Inscription...
                  </>
                ) : (
                  'S\'inscrire'
                )}
              </Button>

              {/* Messages d'état */}
              {formState.message && (
                <div className={`flex items-center space-x-2 text-sm ${
                  formState.status === 'success' ? 'text-black' : 
                  formState.status === 'error' ? 'text-black' : 
                  'text-gray-600'
                }`}>
                  {formState.status === 'success' && <CheckCircle className="w-4 h-4 text-black" />}
                  {formState.status === 'error' && <AlertCircle className="w-4 h-4 text-black" />}
                  <span>{formState.message}</span>
                </div>
              )}

              {/* Texte RGPD */}
              <p className="text-xs text-gray-500 text-center leading-relaxed">
                En soumettant, vous acceptez de recevoir des emails de Debusk. 
                Vous pouvez vous désinscrire à tout moment.
              </p>
            </form>
          </div>

          {/* Garanties */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-gray-600 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-black" />
              <span>100% gratuit</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-black" />
              <span>Sans engagement</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-black" />
              <span>RGPD compliant</span>
            </div>
          </div>
    </div>
  )
}