'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import EmailCapture from './EmailCapture'

const Galaxy = dynamic(() => import('@/components/Galaxy'), { ssr: false })

export default function CTA() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  // Détecter prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Intersection Observer pour les steps
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setActiveStep(index)
            }
          }
        })
      },
      { threshold: 0.5 }
    )

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const steps = [
    {
      title: "Détection Automatique",
      content: "Notre IA analyse tous vos abonnements SaaS et identifie automatiquement les doublons, licences inutilisées et abonnements fantômes."
    },
    {
      title: "Rapports Détaillés",
      content: "Recevez des rapports clairs avec des recommandations personnalisées pour optimiser vos coûts et maximiser vos économies."
    },
    {
      title: "Économies Garanties",
      content: "Nos clients économisent en moyenne 30% sur leurs dépenses SaaS. Rejoignez-les et reprenez le contrôle de votre budget."
    },
    {
      title: "Rejoignez la liste d'attente",
      content: "Soyez parmi les premiers à découvrir Debusk et bénéficiez d'un accès prioritaire avec des avantages exclusifs.",
      isForm: true
    }
  ]

  return (
    <>
      <section className="relative min-h-screen bg-black text-white overflow-hidden">
        {/* Galaxy Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Galaxy 
            transparent={false}
            mouseInteraction={!prefersReducedMotion}
          />
        </div>

        {/* Content Panel */}
        <div className="relative z-10 px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Steps */}
            <div className="space-y-32 lg:space-y-40">
              {steps.map((step, index) => (
                <div
                  key={index}
                  ref={(el) => { stepRefs.current[index] = el }}
                  className={`transition-all duration-1000 ${
                    activeStep === index
                      ? 'opacity-100' + (prefersReducedMotion ? '' : ' translate-y-0')
                      : 'opacity-40' + (prefersReducedMotion ? '' : ' translate-y-8')
                  }`}
                  aria-current={activeStep === index ? 'step' : undefined}
                >
                  <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
                    {step.title}
                  </h2>
                  
                  {step.isForm ? (
                    <div className="space-y-6">
                      <p className="text-lg text-gray-200 mb-8">
                        {step.content}
                      </p>
                      <EmailCapture />
                    </div>
                  ) : (
                    <p className="text-lg text-gray-200 leading-relaxed">
                      {step.content}
                    </p>
                  )}
                </div>
              ))}
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
