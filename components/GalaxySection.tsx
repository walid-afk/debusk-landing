'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const Galaxy = dynamic(() => import('@/components/Galaxy'), { ssr: false })

export default function GalaxySection() {
  const [isVisible, setIsVisible] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)

  // Effet d'apparition qui se rejoue à chaque passage
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('galaxy-section')
      
      if (element) {
        const rect = element.getBoundingClientRect()
        const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2
        
        if (isInView) {
          // Déclencher l'animation quand on entre dans la section
          if (!isVisible) {
            setAnimationKey(prev => prev + 1)
            setIsVisible(true)
          }
        } else {
          // Réinitialiser quand on sort de la section
          if (isVisible) {
            setIsVisible(false)
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Vérifier au chargement

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isVisible])

  return (
    <section id="galaxy-section" className="relative min-h-screen overflow-hidden bg-black">
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
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div 
          key={animationKey}
          className={`text-center text-white transition-all duration-1000 ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 leading-tight">
            Prêt à économiser des milliers d'euros ?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-2xl md:max-w-3xl mx-auto leading-relaxed">
            Rejoignez les entreprises qui ont déjà optimisé leurs abonnements SaaS 
            et réduit leurs coûts de 30% en moyenne.
          </p>
        </div>
      </div>
    </section>
  )
}