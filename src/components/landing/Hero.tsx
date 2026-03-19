import { useNavigate } from "react-router-dom"
import { Youtube, Instagram, Globe } from "lucide-react"

const Hero = () => {
  const navigate = useNavigate()

  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 px-6 overflow-hidden"
      style={{ background: "#060606" }}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* 1. BADGE */}
        <span
          className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-8"
          style={{
            background: "rgba(236,251,169,0.1)",
            color: "#ECFBA9",
            border: "1px solid rgba(236,251,169,0.2)",
          }}
        >
          AI-Powered Ad Optimization
        </span>

        {/* 2. HEADLINE */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6"
          style={{ color: "#FCFCFC" }}
        >
          Scale Your Ads.
          <br />
          <span style={{ color: "#ECFBA9" }}>Smarter. Faster.</span>
        </h1>

        {/* 3. SUBTITLE */}
        <p
          className="text-base sm:text-lg max-w-2xl mb-10 leading-relaxed"
          style={{ color: "rgba(252,252,252,0.6)" }}
        >
          Analyze and optimize your Facebook, Instagram and YouTube ads with AI
          — in one clean, conversion-focused dashboard.
        </p>

        {/* 4. CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
          <button
            onClick={() => navigate("/signup")}
            className="transition-opacity hover:opacity-90"
            style={{
              background: "#ECFBA9",
              color: "#060606",
              padding: "14px 32px",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "16px",
            }}
          >
            Get Started Free
          </button>
          <button
            onClick={() => navigate("/pricing")}
            className="transition-opacity hover:opacity-80"
            style={{
              background: "transparent",
              border: "1px solid rgba(252,252,252,0.3)",
              color: "#FCFCFC",
              padding: "14px 32px",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "16px",
            }}
          >
            See Pricing
          </button>
        </div>

        {/* 5. PLATFORM ICONS ROW */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="flex items-center gap-4">
            <Globe size={20} style={{ color: "rgba(252,252,252,0.4)" }} />
            <Instagram size={20} style={{ color: "rgba(252,252,252,0.4)" }} />
            <Youtube size={20} style={{ color: "rgba(252,252,252,0.4)" }} />
          </div>
          <span className="text-xs" style={{ color: "rgba(252,252,252,0.4)" }}>
            Supports Facebook, Instagram & YouTube Ads
          </span>
        </div>

        {/* 6. STAR RATING */}
        <div className="flex flex-col items-center gap-2 mb-12">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-sm" style={{ color: "#ECFBA9" }}>
                ★
              </span>
            ))}
          </div>
          <span className="text-xs" style={{ color: "rgba(252,252,252,0.5)" }}>
            5.0 · Trusted by 500+ agencies
          </span>
        </div>

        {/* 7. STATS CARDS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-xl mb-16">
          {[
            { value: "2,400+", label: "Ads Analyzed" },
            { value: "38%", label: "Avg. Performance Lift" },
            { value: "$4.2M+", label: "Ad Spend Managed" },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-xl py-5 px-4 text-center"
              style={{
                background: "rgba(252,252,252,0.04)",
                border: "1px solid rgba(252,252,252,0.08)",
              }}
            >
              <div
                className="text-2xl font-bold mb-1"
                style={{ color: "#ECFBA9" }}
              >
                {stat.value}
              </div>
              <div
                className="text-xs"
                style={{ color: "rgba(252,252,252,0.5)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* 8. DASHBOARD SCREENSHOT */}
        <div className="w-full max-w-4xl">
          <img
            src="/images/screen-dashboard.png"
            alt="AdOptimize Dashboard"
            className="w-full rounded-xl"
            style={{ border: "1px solid rgba(252,252,252,0.08)" }}
            onError={(e) => {
              ;(e.currentTarget as HTMLImageElement).style.display = "none"
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
