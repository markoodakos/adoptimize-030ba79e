const steps = [
  {
    number: "1",
    title: "Connect Your Accounts",
    desc: "Link your Facebook, Instagram or YouTube ad accounts securely in seconds."
  },
  {
    number: "2",
    title: "Get AI Analysis",
    desc: "Click Analyze on any ad account and receive instant AI-powered performance insights."
  },
  {
    number: "3",
    title: "Scale With Confidence",
    desc: "Act on recommendations, optimize your spend, and grow your results."
  },
]

const HowItWorks = () => {
  return (
    <section style={{ background: "#00454A" }} className="py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: "#ECFBA9" }}
          >
            HOW IT WORKS
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ color: "#FCFCFC" }}
          >
            Up and Running in Minutes
          </h2>
        </div>

        {/* Steps row */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* Dashed connector line — desktop only */}
          {/* Segment 1: step 1 → step 2 */}
          <div
            className="hidden md:block absolute"
            style={{
              top: "32px",
              left: "calc(16.666% + 40px)",
              right: "calc(50% + 40px)",
              borderTop: "2px dashed rgba(236,251,169,0.3)"
            }}
          />
          {/* Segment 2: step 2 → step 3 */}
          <div
            className="hidden md:block absolute"
            style={{
              top: "32px",
              left: "calc(50% + 40px)",
              right: "calc(16.666% + 40px)",
              borderTop: "2px dashed rgba(236,251,169,0.3)"
            }}
          />

          {steps.map((step, i) => (
            <div key={i} className="relative text-center flex flex-col items-center">
              {/* Number circle */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mb-6 relative z-10"
                style={{
                  background: "rgba(0,0,0,0.2)",
                  color: "#ECFBA9",
                  border: "2px solid rgba(236,251,169,0.3)"
                }}
              >
                {step.number}
              </div>

              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: "#FCFCFC" }}
              >
                {step.title}
              </h3>

              <p
                className="text-sm leading-relaxed max-w-[280px]"
                style={{ color: "rgba(252,252,252,0.7)" }}
              >
                {step.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  )
}

export default HowItWorks