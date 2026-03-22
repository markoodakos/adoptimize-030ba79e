import { useState } from "react"
import { useNavigate } from "react-router-dom"

const CtaBanner = () => {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)

  return (
    <section
      style={{
        background: "#060606",
        padding: "60px 48px"
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .ctabanner-title {
            white-space: normal !important;
          }
          .ctabanner-card {
            padding: 48px 32px !important;
          }
        }
      `}</style>
      <div
        className="ctabanner-card"
        style={{
          background: "#00454A",
          borderRadius: "24px",
          padding: "64px 80px",
          maxWidth: "1280px",
          width: "100%",
          margin: "0 auto",
          textAlign: "center"
        }}
      >
        <h2
          className="ctabanner-title"
          style={{
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 800,
            color: "#FCFCFC",
            marginBottom: "16px",
            lineHeight: 1.1,
            whiteSpace: "nowrap"
          }}
        >
          Ready to Optimize Your Ads?
        </h2>
        <p style={{
          fontSize: "18px",
          color: "rgba(252,252,252,0.7)",
          marginBottom: "40px"
        }}>
          Join 500+ agencies already scaling smarter with AdOptimize.
        </p>
        <button
          onClick={() => navigate("/signup")}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            background: hovered ? "rgba(236,251,169,0.85)" : "#ECFBA9",
            color: "#060606",
            padding: "16px 40px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
            transition: "background 0.2s ease"
          }}
        >
          Get Started Free
        </button>
      </div>
    </section>
  )
}

export default CtaBanner
