import { useState } from "react"
import { Check, X, ChevronDown, ChevronUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import SupportModal from "@/components/layout/SupportModal"
import logoDark from "@/assets/brand/adoptimize_logo_dark.svg"

const plans = [
  {
    id: "starter",
    label: "Starter",
    badge: null as string | null,
    monthlyPrice: null as number | null,
    annualPrice: null as number | null,
    priceLabel: "Free" as string | null,
    sub: "Perfect for getting started",
    cta: "Get Started",
    ctaHref: "/signup" as string | null,
    ctaAction: null as string | null,
    highlighted: false,
    features: [
      { text: "2 ad accounts", included: true },
      { text: "5 AI analyses per month", included: true },
      { text: "1 platform", included: true },
      { text: "Up to 10 campaigns tracked", included: true },
      { text: "Email support", included: true },
      { text: "Export recommendations", included: false },
      { text: "Team members", included: false },
      { text: "Custom reports", included: false },
    ],
  },
  {
    id: "pro",
    label: "Pro",
    badge: "Most Popular",
    monthlyPrice: 49,
    annualPrice: 39,
    priceLabel: null,
    sub: "For freelancers and growing agencies",
    cta: "Start Free Trial",
    ctaHref: "/signup",
    ctaAction: null,
    highlighted: true,
    features: [
      { text: "10 ad accounts", included: true },
      { text: "Unlimited AI analyses", included: true },
      { text: "All 3 platforms", included: true },
      { text: "Unlimited campaigns", included: true },
      { text: "Export recommendations", included: true },
      { text: "Priority email support", included: true },
      { text: "Team members", included: false },
      { text: "Custom reports", included: false },
    ],
  },
  {
    id: "agency",
    label: "Agency",
    badge: null,
    monthlyPrice: 149,
    annualPrice: 119,
    priceLabel: null,
    sub: "For teams managing multiple clients",
    cta: "Contact Us",
    ctaHref: null,
    ctaAction: "support",
    highlighted: false,
    features: [
      { text: "Unlimited ad accounts", included: true },
      { text: "Unlimited AI analyses", included: true },
      { text: "All 3 platforms", included: true },
      { text: "Unlimited campaigns", included: true },
      { text: "Export recommendations", included: true },
      { text: "5 team members", included: true },
      { text: "Custom reports", included: true },
      { text: "Priority support", included: true },
    ],
  },
]

const tableRows = [
  { feature: "Ad accounts", starter: "2", pro: "10", agency: "Unlimited" },
  { feature: "AI analyses", starter: "5/month", pro: "Unlimited", agency: "Unlimited" },
  { feature: "Platforms", starter: "1", pro: "All 3", agency: "All 3" },
  { feature: "Campaigns tracked", starter: "10", pro: "Unlimited", agency: "Unlimited" },
  { feature: "Export recommendations", starter: false, pro: true, agency: true },
  { feature: "Team members", starter: false, pro: false, agency: "5" },
  { feature: "Custom reports", starter: false, pro: false, agency: true },
  { feature: "Support", starter: "Email", pro: "Priority", agency: "Priority" },
]

const faqs = [
  {
    q: "Can I upgrade or downgrade anytime?",
    a: "Yes, you can change your plan at any time. Changes take effect on your next billing cycle.",
  },
  {
    q: "Is there a free trial for paid plans?",
    a: "Yes, Pro plan comes with a 14-day free trial. No credit card required.",
  },
  {
    q: "What happens when I reach my analysis limit?",
    a: "On the Starter plan, you'll be notified when you reach 5 analyses. Upgrade to Pro for unlimited analyses.",
  },
  {
    q: "Do you offer refunds?",
    a: "We offer a 30-day money-back guarantee on all paid plans, no questions asked.",
  },
]

const PricingPage = () => {
  const [annual, setAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [supportOpen, setSupportOpen] = useState(false)
  const { toast } = useToast()

  return (
    <div className="min-h-screen" style={{ background: "#0a1a1a" }}>
      <div className="mx-auto max-w-6xl px-6 py-12">

        {/* ── SECTION 1 — HEADER ── */}
        <nav className="flex items-center justify-between mb-16">
          <img src={logoDark} alt="AdOptimize" className="h-8" />
          <a
            href="/dashboard"
            className="text-sm transition-colors"
            style={{ color: "rgba(255,255,255,0.6)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
          >
            ← Back to dashboard
          </a>
        </nav>

        <div className="text-center mb-16">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#FCFCFC" }}
          >
            Simple, transparent pricing
          </h1>
          <p
            className="text-lg mb-8"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Start free. Scale when ready. Cancel anytime.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3">
            <span
              className="text-sm font-medium"
              style={{ color: annual ? "rgba(255,255,255,0.5)" : "#FCFCFC" }}
            >
              Monthly
            </span>
            <button
              onClick={() => setAnnual((prev) => !prev)}
              className="relative w-12 h-6 rounded-full transition-colors duration-300"
              style={{
                background: annual ? "#ECFBA9" : "rgba(255,255,255,0.15)",
              }}
            >
              <span
                className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-transform duration-300"
                style={{
                  background: annual ? "#060606" : "#FCFCFC",
                  transform: annual ? "translateX(24px)" : "translateX(0)",
                }}
              />
            </button>
            <span
              className="text-sm font-medium"
              style={{ color: annual ? "#FCFCFC" : "rgba(255,255,255,0.5)" }}
            >
              Annual
            </span>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: "#ECFBA9", color: "#060606" }}
            >
              Save 20%
            </span>
          </div>
        </div>

        {/* ── SECTION 2 — PRICING CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="relative rounded-2xl p-6 flex flex-col"
              style={{
                background: plan.highlighted
                  ? "rgba(0,69,74,0.35)"
                  : "rgba(255,255,255,0.04)",
                border: plan.highlighted
                  ? "1px solid #00454A"
                  : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Most Popular badge */}
              {plan.badge && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: "#ECFBA9", color: "#060606" }}
                >
                  {plan.badge}
                </span>
              )}

              {/* Plan label */}
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: "#FCFCFC" }}
              >
                {plan.label}
              </h3>

              {/* Price */}
              <div className="mb-2">
                {plan.priceLabel ? (
                  <span
                    className="text-4xl font-bold"
                    style={{ color: "#FCFCFC" }}
                  >
                    {plan.priceLabel}
                  </span>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span
                      className="text-4xl font-bold"
                      style={{ color: "#FCFCFC" }}
                    >
                      ${annual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      /mo
                    </span>
                  </div>
                )}
                {annual && plan.annualPrice && (
                  <p
                    className="text-xs mt-1"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    Billed annually
                  </p>
                )}
              </div>

              {/* Sub */}
              <p
                className="text-sm mb-6"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {plan.sub}
              </p>

              {/* CTA button */}
              {plan.ctaAction === "support" ? (
                <button
                  onClick={() => setSupportOpen(true)}
                  className="w-full py-2.5 rounded-lg text-sm font-semibold mb-6 transition-opacity hover:opacity-90"
                  style={{
                    background: "rgba(0,69,74,0.4)",
                    border: "1px solid #00454A",
                    color: "#ECFBA9",
                  }}
                >
                  {plan.cta}
                </button>
              ) : (
                <a
                  href={plan.ctaHref!}
                  className="w-full py-2.5 rounded-lg text-sm font-semibold mb-6 transition-opacity hover:opacity-90 text-center block"
                  style={
                    plan.highlighted
                      ? { background: "#ECFBA9", color: "#060606" }
                      : {
                          background: "rgba(0,69,74,0.4)",
                          border: "1px solid #00454A",
                          color: "#ECFBA9",
                        }
                  }
                >
                  {plan.cta}
                </a>
              )}

              {/* Features list */}
              <ul className="flex flex-col gap-3 mt-auto">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    {feature.included ? (
                      <Check size={16} style={{ color: "#ECFBA9" }} />
                    ) : (
                      <X size={16} style={{ color: "rgba(255,255,255,0.2)" }} />
                    )}
                    <span
                      className="text-sm"
                      style={{
                        color: feature.included
                          ? "rgba(255,255,255,0.8)"
                          : "rgba(255,255,255,0.3)",
                      }}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── SECTION 3 — COMPARISON TABLE ── */}
        <div className="mb-24">
          <h2
            className="text-2xl font-bold text-center mb-8"
            style={{ color: "#FCFCFC" }}
          >
            Full comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <th className="text-left py-3 px-4 font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Feature
                  </th>
                  <th className="py-3 px-4 font-medium text-center">Starter</th>
                  <th className="py-3 px-4 font-medium text-center">Pro</th>
                  <th className="py-3 px-4 font-medium text-center">Agency</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, i) => (
                  <tr
                    key={i}
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <td className="py-3 px-4" style={{ color: "rgba(255,255,255,0.7)" }}>
                      {row.feature}
                    </td>
                    {(["starter", "pro", "agency"] as const).map((plan) => (
                      <td key={plan} className="py-3 px-4 text-center">
                        {typeof row[plan] === "boolean" ? (
                          row[plan] ? (
                            <Check size={16} className="inline-block" style={{ color: "#ECFBA9" }} />
                          ) : (
                            <X size={16} className="inline-block" style={{ color: "rgba(255,255,255,0.2)" }} />
                          )
                        ) : (
                          <span style={{ color: "rgba(255,255,255,0.8)" }}>
                            {row[plan] as string}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── SECTION 4 — FAQ ── */}
        <div className="mb-24">
          <h2
            className="text-2xl font-bold text-center mb-8"
            style={{ color: "#FCFCFC" }}
          >
            Frequently asked questions
          </h2>

          <div className="max-w-2xl mx-auto flex flex-col gap-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium transition-colors"
                  style={{ color: "#FCFCFC" }}
                >
                  {faq.q}
                  {openFaq === i ? (
                    <ChevronUp size={16} style={{ color: "rgba(255,255,255,0.5)" }} />
                  ) : (
                    <ChevronDown size={16} style={{ color: "rgba(255,255,255,0.5)" }} />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4">
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 5 — BOTTOM CTA BANNER ── */}
        <div className="text-center py-16">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: "#FCFCFC" }}
          >
            Ready to scale your ads smarter?
          </h2>
          <p
            className="text-base mb-8"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Join hundreds of agencies already using AdOptimize.
          </p>
          <a
            href="/signup"
            className="inline-block px-8 py-3 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: "#ECFBA9", color: "#060606" }}
          >
            Get Started Free
          </a>
        </div>
      </div>

      {/* Support Modal */}
      <SupportModal isOpen={supportOpen} onClose={() => setSupportOpen(false)} />
    </div>
  )
}

export default PricingPage
