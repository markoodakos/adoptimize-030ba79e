import { Check } from "lucide-react"

const benefits = [
  "Save hours of manual ad analysis every week",
  "Spot underperforming ads instantly before budget is wasted",
  "Get specific, actionable AI recommendations per account",
  "Manage Facebook, Instagram and YouTube from one place",
  "Scale ad spend confidently with data-backed decisions",
]

const KeyBenefits = () => {
  return (
    <section
      style={{
        background: "#00454A",
        padding: "100px 0",
        display: "flex",
        justifyContent: "center",
        width: "100%"
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          width: "100%",
          padding: "0 48px"
        }}
      >
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{
            gap: "80px",
            alignItems: "center",
            width: "100%"
          }}
        >
        {/* LEFT — Screenshot */}
        <div className="w-full">
          <img
            src="/images/screen-analytics.png"
            alt="Analytics Dashboard"
            className="w-full"
            style={{
              maxWidth: "560px",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
              display: "block"
            }}
            onError={e => {
              (e.currentTarget as HTMLImageElement).style.display = "none"
            }}
          />
        </div>

        {/* RIGHT — Benefits */}
        <div className="w-full">
          <p style={{
            fontSize: "12px",
            letterSpacing: "3px",
            color: "#ECFBA9",
            fontWeight: 600,
            marginBottom: "16px",
            textTransform: "uppercase"
          }}>
            KEY BENEFITS
          </p>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 800,
            color: "#FCFCFC",
            marginBottom: "40px",
            lineHeight: 1.15
          }}>
            Built for Performance Marketing Teams
          </h2>
          <div className="flex flex-col gap-5">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-4">
                <Check
                  size={20}
                  style={{
                    color: "#ECFBA9",
                    flexShrink: 0,
                    marginTop: "2px"
                  }}
                />
                <span style={{
                  fontSize: "16px",
                  color: "rgba(252,252,252,0.8)",
                  lineHeight: 1.6
                }}>
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}

export default KeyBenefits
