import { useState } from "react"
import { useNavigate } from "react-router-dom"

const CtaBanner = () => {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)

  return (
    <section
      style={{
        background: "#060606",
        padding: "100px 48px"
      }}
    >
      <div
        style={{
          background: "#00454A",
          borderRadius: "24px",
          padding: "64px 80px",
          maxWidth: "860px",
          width: "100%",
          margin: "0 auto",
          textAlign: "center"
        }}
      >
        <h2 style={{
          fontSize: "clamp(32px, 5vw, 52px)",
          fontWeight: 800,
          color: "#FCFCFC",
          marginBottom: "16px",
          lineHeight: 1.1
        }}>
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