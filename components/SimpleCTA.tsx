'use client'

import { useState } from 'react'
import EmailCapture from './EmailCapture'

export default function SimpleCTA() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  return (
    <>
      <section className="py-20 bg-white text-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Titre principal */}
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              PRÊT À OPTIMISER VOS ABONNEMENTS ?
            </h2>
            
            {/* Sous-titre */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Rejoignez des centaines d'entreprises qui ont déjà économisé des milliers d'euros 
              grâce à Debusk.
            </p>
            
            {/* Bouton CTA */}
            <button 
              onClick={() => setIsPopupOpen(true)}
              className="px-12 py-4 bg-black text-white hover:bg-gray-800 rounded-lg text-xl font-bold transition-colors uppercase tracking-wide"
            >
              Rejoindre la liste d'attente
            </button>
            
            {/* Texte sous le bouton */}
            <p className="text-gray-500 mt-4 text-sm">
              500+ entreprises déjà en liste d'attente
            </p>
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
