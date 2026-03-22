import { Linkedin } from "lucide-react"
import logoDark from "@/assets/brand/adoptimize_logo_dark.svg"

const About = () => {
  return (
    <section id="about" style={{ background: "#060606" }} className="py-24 md:py-32">
      <div
        className="grid grid-cols-1 md:grid-cols-2 items-center"
        style={{ maxWidth: "1280px", margin: "0 auto", gap: "80px", padding: "0 48px" }}
      >
        {/* LEFT — Text */}
        <div className="w-full">
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: "#ECFBA9" }}
          >
            ABOUT
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ color: "#FCFCFC", lineHeight: 1.15 }}
          >
            Built for the Modern Ad Team
          </h2>
          <p
            className="text-base mb-4 leading-relaxed"
            style={{ color: "rgba(252,252,252,0.6)" }}
          >
            AdOptimize was built out of frustration with slow, bloated ad tools that require weeks
            of onboarding and deliver vague insights. We believe every agency — regardless of size
            — deserves enterprise-grade AI analysis without the enterprise price tag.
          </p>
          <p
            className="text-base mb-8 leading-relaxed"
            style={{ color: "rgba(252,252,252,0.6)" }}
          >
            Built by a developer who understands both the technical and strategic side of digital
            advertising. AdOptimize is designed to be the tool we always wished existed.
          </p>

          {/* Founder card */}
          <div
            className="flex items-center gap-4 rounded-xl p-4"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <img
              src="/images/founder.png"
              alt="Marko Odak"
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #00454A",
                flexShrink: 0
              }}
              onError={e => {
                const img = e.currentTarget as HTMLImageElement
                if (img.src.includes("/images/founder.png")) {
                  img.src = "/founder.png"
                }
              }}
            />
            <div className="flex-1">
              <p
                className="text-sm font-semibold"
                style={{ color: "#FCFCFC" }}
              >
                Marko Odak
              </p>
              <p
                className="text-xs"
                style={{ color: "rgba(252,252,252,0.5)" }}
              >
                Founder & Developer, AdOptimize
              </p>
            </div>
            <a
              href="https://linkedin.com/in/marko-odak-a229a9381"
              target="_blank"
              rel="noreferrer"
              className="ml-auto transition-opacity hover:opacity-70"
              style={{ color: "#00454A" }}
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* RIGHT — Screenshot */}
        <div className="w-full">
          <img
            src="/images/screen-about.png"
            alt="AdOptimize Platform"
            className="w-full"
            style={{
              maxWidth: "560px",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
              display: "block",
            }}
            onError={(e) => {
              ;(e.currentTarget as HTMLImageElement).style.display = "none"
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default About
