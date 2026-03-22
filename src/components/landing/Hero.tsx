import { useNavigate } from "react-router-dom"
import { Youtube, Instagram, Globe } from "lucide-react"

const Hero = () => {
  const navigate = useNavigate()

  return (
    <section
      id="hero"
      style={{ background: "#060606" }}
    >
      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
            padding: 100px 24px 60px !important;
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
          .hero-stats {
            justify-content: center !important;
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
              style={{
                background: "#ECFBA9",
                color: "#060606",
                padding: "14px 28px",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "15px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Get Started Free
            </button>
            <button
              onClick={() => navigate("/pricing")}
              style={{
                background: "transparent",
                border: "1px solid rgba(252,252,252,0.3)",
                color: "#FCFCFC",
                padding: "14px 28px",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "15px",
                cursor: "pointer",
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
              marginBottom: "32px",
            }}
          >
            <span style={{ color: "#ECFBA9", fontSize: "14px", letterSpacing: "2px" }}>
              ★★★★★
            </span>
            <span style={{ color: "rgba(252,252,252,0.5)", fontSize: "12px" }}>
              5.0 · Trusted by 500+ agencies
            </span>
          </div>

          {/* 7. STATS CARDS ROW */}
          <div
            className="hero-stats"
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            {[
              { value: "2,400+", label: "Ads Analyzed" },
              { value: "38%", label: "Avg. Lift" },
              { value: "$4.2M+", label: "Ad Spend" },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(252,252,252,0.04)",
                  border: "1px solid rgba(252,252,252,0.08)",
                  borderRadius: "12px",
                  padding: "16px 24px",
                  minWidth: "120px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    color: "#ECFBA9",
                    fontSize: "22px",
                    fontWeight: 700,
                    marginBottom: "2px",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    color: "rgba(252,252,252,0.5)",
                    fontSize: "12px",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
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
    </section>
  )
}

export default Hero