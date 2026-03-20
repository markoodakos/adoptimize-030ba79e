import { useState } from "react"
import { useNavigate } from "react-router-dom"

const CtaBanner = () => {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)

  return (
    <section
      className="py-24 md:py-32"
      style={{ background: "#060606" }}
    >
      <div
        className="max-w-[1280px] mx-auto px-6 md:px-12 text-center rounded-2xl"
        style={{
          background: "rgba(236,251,169,0.06)",
          border: "1px solid rgba(236,251,169,0.15)",
          padding: "64px 48px",
        }}
      >
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: "#FCFCFC" }}
        >
          Ready to Optimize Your Ads?
        </h2>
        <p
          className="text-base md:text-lg mb-8 max-w-xl mx-auto"
          style={{ color: "rgba(252,252,252,0.6)" }}
        >
          Join 500+ agencies already scaling smarter with AdOptimize.
        </p>
        <button
          onClick={() => navigate("/signup")}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            background: hovered ? "#00454A" : "#060606",
            color: "#ECFBA9",
            padding: "16px 40px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
            transition: "background 0.2s ease",
          }}
        >
          Get Started Free
        </button>
      </div>
    </section>
  )
}

export default CtaBanner
