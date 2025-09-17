import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-black">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-black">
            Debusk
          </Link>

          {/* Navigation links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-black transition-colors"
            >
              Accueil
            </Link>
            <Link 
              href="/waitlist" 
              className="text-gray-600 hover:text-black transition-colors"
            >
              Liste d'attente
            </Link>
          </div>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <Button asChild className="bg-black text-white hover:bg-gray-800">
              <Link href="/waitlist">
                Rejoindre la liste
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
