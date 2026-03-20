import Navbar from "@/components/landing/Navbar"
import Hero from "@/components/landing/Hero"
import Features from "@/components/landing/Features"
import HowItWorks from "@/components/landing/HowItWorks"
import KeyBenefits from "@/components/landing/KeyBenefits"
import SocialProof from "@/components/landing/SocialProof"
import PricingPreview from "@/components/landing/PricingPreview"
import About from "@/components/landing/About"
import CtaBanner from "@/components/landing/CtaBanner"
import Footer from "@/components/landing/Footer"
import SupportModal from "@/components/layout/SupportModal"
import { useState } from "react"

const Landing = () => {
  const [supportOpen, setSupportOpen] = useState(false)

  return (
    <div className="min-h-screen" style={{ background: "#060606" }}>
      <Navbar onContactClick={() => setSupportOpen(true)} />
      <Hero />
      <Features />
      <HowItWorks />
      <KeyBenefits />
      <SocialProof />
      <PricingPreview onContactClick={() => setSupportOpen(true)} />
      <About />
      <CtaBanner />
      <Footer onContactClick={() => setSupportOpen(true)} />

      <SupportModal
        isOpen={supportOpen}
        onClose={() => setSupportOpen(false)}
      />
    </div>
  )
}

export default Landing
