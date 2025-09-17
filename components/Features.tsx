'use client'

import { useState } from 'react'
import { CheckCircle, FileText, Clock, Shield, Target, Upload, Download } from 'lucide-react'
import EmailCapture from './EmailCapture'

export default function Features() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  return (
    <>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Titre principal */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                Pourquoi Debusk ?
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Nous révolutionnons la gestion des abonnements SaaS en automatisant 
                la détection et l'optimisation de vos dépenses logicielles.
              </p>
            </div>

            {/* Cartes de fonctionnalités */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-black mb-3">Détection Automatique</h3>
                <p className="text-gray-600 text-sm">
                  Identification automatique de tous vos abonnements SaaS cachés et doublons
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-black mb-3">En Quelques Minutes</h3>
                <p className="text-gray-600 text-sm">
                  Plus besoin de passer des heures à analyser vos factures et abonnements
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-black mb-3">100% Sécurisé</h3>
                <p className="text-gray-600 text-sm">
                  Vos données sont chiffrées et protégées selon les normes RGPD
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-black mb-3">Optimisé Entreprises</h3>
                <p className="text-gray-600 text-sm">
                  Rapports professionnels qui maximisent vos économies et optimisent vos coûts
                </p>
              </div>
            </div>

            {/* Section principale */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-sm">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Colonne gauche - Avantages */}
                <div>
                  <h3 className="text-2xl font-bold text-black mb-8">Une solution qui change tout</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-black mt-1 flex-shrink-0" />
                      <span className="text-gray-700">10 fois plus rapide que l'audit manuel</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-black mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Détection automatique des abonnements fantômes</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-black mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Identification des doublons et licences inutilisées</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-black mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Conseils personnalisés pour optimiser vos coûts</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-black mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Support expert tout au long du processus</span>
                    </div>
                  </div>

                  {/* Qualité professionnelle */}
                  <div className="bg-gray-50 rounded-xl p-4 flex items-center space-x-3">
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-black">Qualité professionnelle</h4>
                      <p className="text-sm text-gray-600">Rapports optimisés selon les standards des DAF</p>
                    </div>
                  </div>
                </div>

                {/* Colonne droite - Processus */}
                <div>
                  <h3 className="text-2xl font-bold text-black mb-8">Comment ça marche ?</h3>
                  
                  <div className="space-y-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-black mb-2">Connectez vos comptes</h4>
                        <p className="text-gray-600">5 minutes pour connecter vos comptes bancaires et cartes</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-black mb-2">Analyse automatique</h4>
                        <p className="text-gray-600">Détection intelligente de tous vos abonnements SaaS</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-black mb-2">Recevez votre rapport</h4>
                        <p className="text-gray-600">Rapport détaillé avec recommandations d'optimisation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
