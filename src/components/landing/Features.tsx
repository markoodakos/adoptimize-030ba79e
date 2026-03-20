import {
  Zap, LayoutDashboard, TrendingUp,
  Lightbulb, Monitor, Shield
} from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "AI Analysis",
    desc: "Get instant, actionable recommendations for every ad account with one click."
  },
  {
    icon: LayoutDashboard,
    title: "Multi-Platform",
    desc: "Facebook, Instagram and YouTube managed in a single, unified view."
  },
  {
    icon: TrendingUp,
    title: "Real-Time Insights",
    desc: "Live performance data across all campaigns, updated continuously."
  },
  {
    icon: Lightbulb,
    title: "Smart Recommendations",
    desc: "AI-powered tips prioritized by impact so you always know what to fix first."
  },
  {
    icon: Monitor,
    title: "Clean Dashboard",
    desc: "Distraction-free interface built for performance marketers who value clarity."
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    desc: "Enterprise-grade security for your ad accounts and campaign data."
  },
]

const Features = () => {
  return (
    <section id="features" style={{ background: "#060606" }} className="py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: "#ECFBA9" }}
          >
            FEATURES
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "#FCFCFC" }}
          >
            Everything You Need to Scale
          </h2>
          <p
            className="text-base md:text-lg max-w-xl mx-auto"
            style={{ color: "rgba(252,252,252,0.6)" }}
          >
            One dashboard. Three platforms. Infinite insights.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={i}
                className="rounded-2xl p-8 transition-colors duration-300 cursor-default"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.1)"
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(236,251,169,0.4)"
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.1)"
                }}
              >
                <Icon size={28} style={{ color: "#ECFBA9" }} className="mb-4" />
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: "#FCFCFC" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(252,252,252,0.6)" }}
                >
                  {feature.desc}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default Features
