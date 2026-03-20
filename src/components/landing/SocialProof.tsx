const testimonials = [
  {
    quote: "AdOptimize cut our analysis time in half. The AI recommendations are spot on and actually actionable.",
    name: "Sarah K.",
    role: "Performance Marketing Manager",
    initials: "SK"
  },
  {
    quote: "Finally a tool that speaks our language. Clean, fast, and incredibly useful for our agency.",
    name: "James R.",
    role: "Digital Agency Owner",
    initials: "JR"
  },
  {
    quote: "The best investment we made for our ad operations this year. ROI was visible within the first week.",
    name: "Ana M.",
    role: "Media Buyer",
    initials: "AM"
  },
]

const SocialProof = () => {
  return (
    <section style={{ background: "#060606" }} className="py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "#FCFCFC" }}
          >
            Trusted by Growing Agencies
          </h2>
          <p
            className="text-base md:text-lg"
            style={{ color: "rgba(252,252,252,0.6)" }}
          >
            See what performance marketers are saying
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl p-8"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.1)"
              }}
            >
              {/* Stars */}
              <div
                className="text-sm mb-4 tracking-wider"
                style={{ color: "#ECFBA9" }}
              >
                ★★★★★
              </div>

              {/* Quote */}
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "rgba(252,252,252,0.8)" }}
              >
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold"
                  style={{
                    background: "rgba(236,251,169,0.15)",
                    color: "#ECFBA9"
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div
                    className="text-sm font-medium"
                    style={{ color: "#FCFCFC" }}
                  >
                    {t.name}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "rgba(252,252,252,0.5)" }}
                  >
                    {t.role}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default SocialProof
