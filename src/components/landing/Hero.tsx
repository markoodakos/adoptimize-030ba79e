import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Youtube, Instagram, Globe } from "lucide-react"

const Hero = () => {
  const navigate = useNavigate()
  const [primaryHovered, setPrimaryHovered] = useState(false)
  const [secondaryHovered, setSecondaryHovered] = useState(false)

  return (
    <section
      id="hero"
      style={{
        background: "#060606",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column" as const,
        justifyContent: "center",
        padding: "100px 48px 80px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
            padding: 0 !important;
          }
          .hero-left {
            align-items: center !important;
            text-align: center;
            order: 2;
          }
          .hero-right {
            order: 1;
          }
          .hero-right img {
            max-width: 340px !important;
            margin: 0 auto;
          }
          .hero-platforms {
            justify-content: center !important;
          }
          .hero-ctas {
            justify-content: center !important;
          }
          .hero-stats-row {
            padding: 0 24px;
            gap: 12px !important;
          }
        }
      `}</style>

      <div
        className="hero-grid"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          gap: "64px",
          padding: "140px 48px 100px",
        }}
      >
        {/* LEFT COLUMN */}
        <div
          className="hero-left"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {/* 1. BADGE */}
          <span
            style={{
              background: "rgba(236,251,169,0.1)",
              color: "#ECFBA9",
              border: "1px solid rgba(236,251,169,0.2)",
              fontSize: "14px",
              padding: "6px 16px",
              borderRadius: "999px",
              fontWeight: 500,
              marginBottom: "24px",
            }}
          >
            AI-Powered Ad Optimization
          </span>

          {/* 2. HEADLINE */}
          <h1
            style={{
              color: "#FCFCFC",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 800,
              lineHeight: 1.08,
              marginBottom: "20px",
            }}
          >
            Scale Your Ads.
            <br />
            <span style={{ color: "#ECFBA9" }}>Smarter. Faster.</span>
          </h1>

          {/* 3. SUBTITLE */}
          <p
            style={{
              color: "rgba(252,252,252,0.6)",
              fontSize: "16px",
              lineHeight: 1.7,
              maxWidth: "480px",
              marginBottom: "32px",
            }}
          >
            Analyze and optimize your Facebook, Instagram and YouTube ads with AI
            — in one clean, conversion-focused dashboard.
          </p>

          {/* 4. CTA BUTTONS */}
          <div
            className="hero-ctas"
            style={{
              display: "flex",
              gap: "12px",
              marginBottom: "32px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => navigate("/signup")}
              onMouseEnter={() => setPrimaryHovered(true)}
              onMouseLeave={() => setPrimaryHovered(false)}
              style={{
                background: primaryHovered
                  ? "rgba(236,251,169,0.85)"
                  : "#ECFBA9",
                color: "#060606",
                padding: "14px 28px",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "15px",
                border: "none",
                cursor: "pointer",
                transition: "background 0.2s ease",
              }}
            >
              Get Started Free
            </button>
            <button
              onClick={() => navigate("/pricing")}
              onMouseEnter={() => setSecondaryHovered(true)}
              onMouseLeave={() => setSecondaryHovered(false)}
              style={{
                background: secondaryHovered
                  ? "rgba(255,255,255,0.08)"
                  : "transparent",
                border: secondaryHovered
                  ? "1px solid rgba(255,255,255,0.5)"
                  : "1px solid rgba(252,252,252,0.3)",
                color: "#FCFCFC",
                padding: "14px 28px",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "15px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              See Pricing
            </button>
          </div>

          {/* 5. PLATFORM ICONS ROW */}
          <div
            className="hero-platforms"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            <Globe size={18} style={{ color: "rgba(252,252,252,0.4)" }} />
            <Instagram size={18} style={{ color: "rgba(252,252,252,0.4)" }} />
            <Youtube size={18} style={{ color: "rgba(252,252,252,0.4)" }} />
            <span style={{ color: "rgba(252,252,252,0.4)", fontSize: "12px" }}>
              Supports Facebook, Instagram & YouTube Ads
            </span>
          </div>

          {/* 6. STAR RATING */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ color: "#ECFBA9", fontSize: "14px", letterSpacing: "2px" }}>
              ★★★★★
            </span>
            <span style={{ color: "rgba(252,252,252,0.5)", fontSize: "12px" }}>
              5.0 · Trusted by 500+ agencies
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="hero-right" style={{ display: "flex", justifyContent: "center" }}>
          <img
            src="/images/myHero-image.png"
            alt="AdOptimize Dashboard"
            style={{
              maxWidth: "520px",
              width: "100%",
              borderRadius: "16px",
              display: "block",
            }}
            onError={(e) => {
              ;(e.currentTarget as HTMLImageElement).style.display = "none"
            }}
          />
        </div>
      </div>

      {/* STATS CARDS ROW — below grid */}
      <div
        className="hero-stats-row"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "24px",
          flexWrap: "wrap",
          width: "100%",
          margin: "0 auto",
          padding: "0",
          marginTop: "24px",
        }}
      >
        {[
          { value: "2,400+", label: "Ads Analyzed" },
          { value: "38%", label: "Avg. Performance Lift" },
          { value: "$4.2M+", label: "Ad Spend Managed" },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              background: "rgba(252,252,252,0.04)",
              border: "1px solid rgba(252,252,252,0.08)",
              borderRadius: "12px",
              padding: "28px 40px",
              minWidth: "200px",
              textAlign: "center",
              flex: 1,
            }}
          >
            <div
              style={{
                color: "#ECFBA9",
                fontSize: "36px",
                fontWeight: 700,
                marginBottom: "4px",
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                color: "rgba(252,252,252,0.5)",
                fontSize: "14px",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Hero