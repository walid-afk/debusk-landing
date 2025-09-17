'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import EmailCapture from './EmailCapture'

const Galaxy = dynamic(() => import('@/components/Galaxy'), { ssr: false })

export default function Hero() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  return (
    <>
      <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Galaxy Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Galaxy 
          transparent={false}
          mouseInteraction={true}
          mouseRepulsion={true}
          repulsionStrength={2}
          glowIntensity={0.3}
          starSpeed={0.5}
          density={1}
        />
      </div>
      
      {/* Contenu avec effet d'apparition */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center text-white px-4 max-w-4xl mx-auto">
          {/* Titre principal */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-wide">
            DEBUSK ARRIVE BIENTÔT
          </h1>
          
          {/* Sous-titre */}
          <h2 className="text-xl md:text-2xl font-bold mb-8 text-white">
            L'Expert Certifié en optimisation des abonnements SaaS
          </h2>
          
          {/* Paragraphe explicatif */}
          <div className="mb-12">
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
              Soyez parmi les premiers à découvrir <strong className="text-white">Debusk</strong> et reprenez le contrôle de vos dépenses logicielles. 
              Notre solution détecte automatiquement vos abonnements fantômes, doublons et licences inutilisées. 
              Obtenez des rapports clairs et des économies mesurables en quelques clics.
            </p>
          </div>
          
          {/* Encadré secondaire */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 md:p-8 max-w-3xl mx-auto">
            <p className="text-base md:text-lg text-white leading-relaxed">
              <strong>Debusk détecte chaque abonnement</strong> de votre entreprise et révèle le gaspillage caché. 
              Annulez, optimisez, renégociez : <strong>votre budget allégé est prêt à réinvestir ailleurs.</strong>
            </p>
          </div>
          
          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <button 
              onClick={() => setIsPopupOpen(true)}
              className="px-8 py-4 bg-white text-black hover:bg-gray-200 rounded-lg text-lg font-semibold transition-colors"
            >
              Rejoindre la liste d'attente
            </button>
            <button className="px-8 py-4 border-2 border-white hover:bg-white hover:text-black rounded-lg text-lg font-semibold transition-colors">
              Voir la démo
            </button>
          </div>
        </div>
      </div>
      </section>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsPopupOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 text-black hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* EmailCapture Component */}
            <div className="p-6">
              <EmailCapture />
            </div>
          </div>
        </div>
      )}
    </>
  )
}