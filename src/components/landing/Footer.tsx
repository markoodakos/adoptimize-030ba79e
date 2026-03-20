import { Linkedin, Github } from "lucide-react"
import { useNavigate } from "react-router-dom"
import logoDark from "@/assets/brand/adoptimize_logo_dark.svg"

interface FooterProps {
  onContactClick: () => void
}

const columns = [
  {
    heading: "PRODUCT",
    links: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Pricing", href: "/pricing" },
      { label: "Features", href: null, scrollTo: "features" },
      { label: "Analytics", href: "/analytics" },
    ],
  },
  {
    heading: "COMPANY",
    links: [
      { label: "About", href: null, scrollTo: "about" },
      { label: "Contact", href: null, action: "contact" },
      { label: "Blog", href: "#", comingSoon: true },
    ],
  },
  {
    heading: "LEGAL",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
]

const Footer = ({ onContactClick }: FooterProps) => {
  const navigate = useNavigate()

  const handleLink = (link: any) => {
    if (link.action === "contact") {
      onContactClick()
      return
    }
    if (link.scrollTo) {
      const el = document.getElementById(link.scrollTo)
      if (el) el.scrollIntoView({ behavior: "smooth" })
      return
    }
    if (link.href && link.href !== "#") {
      navigate(link.href)
    }
  }

  return (
    <footer
      style={{
        background: "#060606",
        borderTop: "1px solid rgba(252,252,252,0.08)",
      }}
      className="py-16"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Column 1 — Brand */}
          <div className="md:col-span-2">
            <img src={logoDark} alt="AdOptimize" className="h-7 mb-4" />
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: "rgba(252,252,252,0.5)" }}
            >
              AI-powered ad optimization for modern agencies.
            </p>
          </div>

          {/* Columns 2-4 */}
          {columns.map((col) => (
            <div key={col.heading}>
              <p
                className="text-xs font-semibold tracking-[0.15em] mb-4"
                style={{ color: "rgba(252,252,252,0.4)" }}
              >
                {col.heading}
              </p>
              {col.links.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleLink(link)}
                  className="block w-full text-left transition-colors duration-200 mb-3"
                  style={{
                    fontSize: "14px",
                    color: "rgba(252,252,252,0.6)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLButtonElement).style.color = "#ECFBA9"
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLButtonElement).style.color =
                      "rgba(252,252,252,0.6)"
                  }}
                >
                  {link.label}
                  {(link as any).comingSoon && (
                    <span
                      className="ml-2 text-xs"
                      style={{ color: "rgba(252,252,252,0.3)" }}
                    >
                      (Coming Soon)
                    </span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4"
          style={{ borderTop: "1px solid rgba(252,252,252,0.08)" }}
        >
          <p className="text-sm" style={{ color: "rgba(252,252,252,0.4)" }}>
            © 2026 AdOptimize. All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com/in/marko-odak-a229a9381"
              target="_blank"
              rel="noreferrer"
              className="transition-colors duration-200"
              style={{ color: "rgba(252,252,252,0.4)" }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.color = "#ECFBA9"
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(252,252,252,0.4)"
              }}
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://github.com/markoodakos"
              target="_blank"
              rel="noreferrer"
              className="transition-colors duration-200"
              style={{ color: "rgba(252,252,252,0.4)" }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.color = "#ECFBA9"
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(252,252,252,0.4)"
              }}
            >
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
