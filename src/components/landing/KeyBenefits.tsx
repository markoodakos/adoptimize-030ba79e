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
    <section style={{ background: "#060606" }} className="py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 items-center" style={{ gap: "80px" }}>

        {/* LEFT — Screenshot */}
        <div className="order-2 md:order-1">
          <img
            src="/images/screen-analytics.png"
            alt="AdOptimize analytics dashboard"
            className="w-full"
            style={{
              maxWidth: "560px",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.4)"
            }}
            onError={e => {
              (e.currentTarget as HTMLImageElement).style.display = "none"
            }}
          />
        </div>

        {/* RIGHT — Benefits */}
        <div className="order-1 md:order-2">
          <span
            className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: "#ECFBA9" }}
          >
            KEY BENEFITS
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold mb-8"
            style={{ color: "#FCFCFC" }}
          >
            Built for Performance Marketing Teams
          </h2>

          <div className="flex flex-col gap-5">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check size={20} style={{ color: "#ECFBA9" }} className="mt-0.5 flex-shrink-0" />
                <span
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(252,252,252,0.8)" }}
                >
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default KeyBenefits
