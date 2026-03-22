import { Check } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface PricingPreviewProps {
  onContactClick: () => void
}

const plans = [
  {
    id: "starter",
    label: "Starter",
    price: "Free",
    sub: "Perfect for getting started",
    cta: "Get Started",
    ctaHref: "/signup",
    ctaAction: null,
    highlighted: false,
    features: [
      "2 ad accounts",
      "5 AI analyses per month",
      "1 platform",
      "Up to 10 campaigns tracked",
      "Email support",
    ],
  },
  {
    id: "pro",
    label: "Pro",
    price: "$49/mo",
    sub: "For freelancers and growing agencies",
    cta: "Start Free Trial",
    ctaHref: "/signup",
    ctaAction: null,
    highlighted: true,
    features: [
      "10 ad accounts",
      "Unlimited AI analyses",
      "All 3 platforms",
      "Unlimited campaigns",
      "Export recommendations",
      "Priority email support",
      "Advanced analytics",
    ],
  },
  {
    id: "agency",
    label: "Agency",
    price: "$149/mo",
    sub: "For teams managing multiple clients",
    cta: "Contact Us",
    ctaHref: null,
    ctaAction: "contact",
    highlighted: false,
    features: [
      "Unlimited ad accounts",
      "Unlimited AI analyses",
      "All 3 platforms",
      "Unlimited campaigns",
      "Export recommendations",
      "5 team members",
      "Custom reports",
      "Priority support",
    ],
  },
]

const PricingPreview = ({ onContactClick }: PricingPreviewProps) => {
  const navigate = useNavigate()

  return (
    <section style={{ background: "#060606", borderBottom: "1px solid rgba(255,255,255,0.06)" }} className="py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: "#ECFBA9" }}
          >
            PRICING
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "#FCFCFC" }}
          >
            Tailored Plans for Your Advertising Scale
          </h2>
          <p
            className="text-base md:text-lg max-w-xl mx-auto"
            style={{ color: "rgba(252,252,252,0.6)" }}
          >
            Start free. Upgrade when ready. Cancel anytime.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="relative rounded-2xl p-8"
              style={{
                background: plan.highlighted
                  ? "rgba(236,251,169,0.06)"
                  : "rgba(255,255,255,0.03)",
                border: plan.highlighted
                  ? "1px solid rgba(236,251,169,0.3)"
                  : "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {/* Most Popular badge */}
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{
                      background: "#ECFBA9",
                      color: "#060606",
                    }}
                  >
                    Most Popular
                  </span>
                </div>
              )}

              {/* Label */}
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "#FCFCFC" }}
              >
                {plan.label}
              </h3>

              {/* Price */}
              <p
                className="text-3xl font-bold mb-2"
                style={{ color: "#ECFBA9" }}
              >
                {plan.price}
              </p>

              {/* Sub */}
              <p
                className="text-sm mb-6"
                style={{ color: "rgba(252,252,252,0.5)" }}
              >
                {plan.sub}
              </p>

              {/* CTA */}
              {plan.ctaAction === "contact" ? (
                <button
                  onClick={onContactClick}
                  className="w-full transition-opacity hover:opacity-90 mb-8"
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.3)",
                    color: "#FCFCFC",
                    padding: "12px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  {plan.cta}
                </button>
              ) : (
                <button
                  onClick={() => navigate(plan.ctaHref!)}
                  className="w-full transition-opacity hover:opacity-90 mb-8"
                  style={
                    plan.highlighted
                      ? {
                          background: "#ECFBA9",
                          color: "#060606",
                          padding: "12px",
                          borderRadius: "8px",
                          fontSize: "14px",
                          fontWeight: 700,
                        }
                      : {
                          background: "transparent",
                          border: "1px solid rgba(255,255,255,0.3)",
                          color: "#FCFCFC",
                          padding: "12px",
                          borderRadius: "8px",
                          fontSize: "14px",
                          fontWeight: 600,
                        }
                  }
                >
                  {plan.cta}
                </button>
              )}

              {/* Features */}
              <div className="flex flex-col gap-3">
                {plan.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check
                      size={16}
                      style={{ color: "#ECFBA9", flexShrink: 0 }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: "rgba(252,252,252,0.7)" }}
                    >
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* See full pricing link */}
        <div className="text-center">
          <button
            onClick={() => navigate("/pricing")}
            className="transition-all hover:underline"
            style={{
              color: "#ECFBA9",
              fontSize: "15px",
              fontWeight: 600,
              background: "none",
              border: "none",
            }}
          >
            See full pricing details →
          </button>
        </div>
      </div>
    </section>
  )
}

export default PricingPreview
