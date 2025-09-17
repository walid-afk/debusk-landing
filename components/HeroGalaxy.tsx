'use client'

import { useEffect, useRef, useState } from 'react'
import EmailCapture from './EmailCapture'

export default function HeroGalaxy() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Configuration du canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particules
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      opacity: number
    }> = []

    // Créer des particules
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        color: '#ffffff',
        opacity: Math.random() * 0.8 + 0.2
      })
    }

    let mouseX = canvas.width / 2
    let mouseY = canvas.height / 2
    let scrollY = 0

    // Gestion de la souris
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    // Gestion du scroll
    const handleScroll = () => {
      scrollY = window.scrollY
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)

    const animate = () => {
      // Effet de fondu
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Dessiner les particules
      particles.forEach((particle, index) => {
        // Effet de parallaxe selon le scroll
        const parallaxSpeed = (index % 3 + 1) * 0.5 // Vitesses différentes pour chaque couche
        particle.y += scrollY * parallaxSpeed * 0.01

        // Mouvement naturel
        particle.x += particle.vx
        particle.y += particle.vy

        // Effet de repulsion de la souris
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 100 && distance > 0) {
          const force = (100 - distance) / 100
          const repulsionX = (dx / distance) * force * 0.05
          const repulsionY = (dy / distance) * force * 0.05
          particle.vx -= repulsionX
          particle.vy -= repulsionY
          
          // Effet de lueur plus intense près de la souris
          particle.opacity = Math.min(1, particle.opacity + force * 0.3)
        } else {
          // Retour à l'opacité normale
          particle.opacity = Math.max(0.2, particle.opacity - 0.01)
        }

        // Limiter la vitesse
        particle.vx *= 0.99
        particle.vy *= 0.99

        // Rebond sur les bords horizontaux
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -0.8
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))

        // Réinitialiser les particules qui sortent par le haut ou le bas
        if (particle.y < -50) {
          particle.y = canvas.height + 50
          particle.x = Math.random() * canvas.width
        }
        if (particle.y > canvas.height + 50) {
          particle.y = -50
          particle.x = Math.random() * canvas.width
        }

        // Dessiner la particule avec effet de lueur
        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.shadowBlur = 15
        ctx.shadowColor = '#ffffff'
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.fill()
        ctx.restore()
      })

      // Dessiner le curseur
      ctx.save()
      ctx.shadowBlur = 20
      ctx.shadowColor = '#60a5fa'
      ctx.beginPath()
      ctx.arc(mouseX, mouseY, 5, 0, Math.PI * 2)
      ctx.fillStyle = '#60a5fa'
      ctx.fill()
      ctx.restore()

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('scroll', handleScroll)
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'transparent' }}
      />
      
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
    </section>
  )
}