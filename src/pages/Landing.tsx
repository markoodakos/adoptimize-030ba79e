import Navbar from "@/components/landing/Navbar"
import Hero from "@/components/landing/Hero"
import SupportModal from "@/components/layout/SupportModal"
import { useState } from "react"

const Landing = () => {
  const [supportOpen, setSupportOpen] = useState(false)

  return (
    <div className="min-h-screen" style={{ background: "#060606" }}>
      <Navbar onContactClick={() => setSupportOpen(true)} />
      <Hero />

      {/* About section anchor */}
      <div id="about" />

      <SupportModal
        isOpen={supportOpen}
        onClose={() => setSupportOpen(false)}
      />
    </div>
  )
}

export default Landing
