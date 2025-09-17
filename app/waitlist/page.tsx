import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, Users, CheckCircle } from "lucide-react"

export default function WaitlistPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge de lancement */}
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-8">
              <Clock className="w-4 h-4" />
              <span>Lancement prévu : Janvier 2024</span>
            </div>

            {/* Titre principal */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Debusk arrive{" "}
              <span className="text-blue-600">bientôt</span>
            </h1>

            {/* Sous-titre */}
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              L'outil révolutionnaire qui détecte automatiquement vos abonnements cachés 
              et vous fait économiser des centaines d'euros par an.
            </p>

            {/* Statistiques */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-12">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">2,500+</div>
                  <div className="text-sm text-gray-600">Personnes en attente</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">€247</div>
                  <div className="text-sm text-gray-600">Économies moyennes</div>
                </div>
              </div>
            </div>

            {/* CTA principal */}
            <Button size="lg" className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700">
              Rejoindre la liste d'attente
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Gratuit • Sans engagement • Accès prioritaire
            </p>
          </div>
        </div>
      </section>

      {/* Formulaire d'inscription */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-6">
              Rejoignez la liste d'attente
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Soyez parmi les premiers à découvrir Debusk et bénéficiez d'un accès prioritaire 
              avec des avantages exclusifs.
            </p>

            {/* Avantages */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <span>Accès gratuit pendant 3 mois</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <span>Accès prioritaire au lancement</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <span>Support dédié</span>
              </div>
            </div>

            {/* Formulaire */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:border-white focus:outline-none"
                />
                <Button 
                  type="submit"
                  size="lg" 
                  className="w-full bg-white text-blue-600 hover:bg-gray-100"
                >
                  Rejoindre la liste d'attente
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </div>

            {/* Garanties */}
            <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-blue-200 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>100% gratuit</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Sans engagement</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>RGPD compliant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer simple */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Debusk</h3>
          <p className="text-gray-300 mb-4">
            L'outil qui détecte automatiquement vos abonnements cachés.
          </p>
          <p className="text-gray-400 text-sm">
            © 2024 Debusk. Tous droits réservés.
          </p>
        </div>
      </footer>
    </main>
  )
}