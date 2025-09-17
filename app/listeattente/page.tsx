import Hero from "@/components/Hero"
import Features from "@/components/Features"
import GalaxySection from "@/components/GalaxySection"
import SimpleCTA from "@/components/SimpleCTA"
import Footer from "@/components/Footer"

export default function ListeAttente() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      <GalaxySection />
      <SimpleCTA />
      <Footer />
    </div>
  )
}

