'use client'

import Link from "next/link"
import { Linkedin, Mail, Phone, MapPin } from "lucide-react"
import dynamic from 'next/dynamic'

const Galaxy = dynamic(() => import('@/components/Galaxy'), { ssr: false })

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white relative overflow-hidden">
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
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main footer content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company info */}
            <div className="lg:col-span-2">
              <Link href="/" className="text-2xl font-bold text-white mb-4 block">
                Debusk
              </Link>
              
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                L'outil qui détecte automatiquement vos abonnements cachés et optimise vos coûts SaaS. 
                Économisez des milliers d'euros sans effort.
              </p>
              
              {/* Contact info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="w-4 h-4" />
                  <span>contact@debusk.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="w-4 h-4" />
                  <span>+33 1 23 45 67 89</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="w-4 h-4" />
                  <span>Paris, France</span>
                </div>
              </div>
            </div>

            {/* Product links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Produit</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="#features"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Fonctionnalités
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#security"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Sécurité
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#pricing"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Tarifs
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#how-it-works"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Comment ça marche
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal & Resources */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Légal & Ressources</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="#legal"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Mentions légales
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#privacy"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Politique de confidentialité
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#terms"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    CGU
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#rgpd"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    RGPD
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom footer */}
          <div className="border-t border-gray-600 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-gray-400 text-sm">
                © {currentYear} Debusk. Tous droits réservés.
              </div>
              
              {/* Social links */}
              <div className="flex items-center space-x-4">
                <a 
                  href="https://linkedin.com/company/debusk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="mailto:contact@debusk.com"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
              
              {/* Trust badges */}
              <div className="flex items-center space-x-4 text-xs text-gray-400">
                <span>🔒 RGPD</span>
                <span>🛡️ DSP2</span>
                <span>✅ ISO 27001</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}