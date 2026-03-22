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
      { label: "Privacy Policy", href: "#", comingSoon: true },
      { label: "Terms of Service", href: "#", comingSoon: true },
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
        padding: "64px 48px 32px",
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .footer-top {
            flex-direction: column;
            gap: 40px;
          }
          .footer-links-group {
            flex-wrap: wrap;
            gap: 40px;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
        }
      `}</style>

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* TOP ROW */}
        <div
          className="footer-top"
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "48px",
          }}
        >
          {/* LEFT — Brand block */}
          <div>
            <img src={logoDark} alt="AdOptimize" className="h-7 mb-4" />
            <p
              style={{
                fontSize: "14px",
                color: "rgba(252,252,252,0.45)",
                maxWidth: "260px",
                lineHeight: 1.6,
              }}
            >
              AI-powered ad optimization for modern agencies.
            </p>
          </div>

          {/* RIGHT — Link columns */}
          <div
            className="footer-links-group"
            style={{
              display: "flex",
              gap: "80px",
            }}
          >
            {columns.map((col) => (
              <div key={col.heading}>
                <p
                  style={{
                    fontSize: "11px",
                    letterSpacing: "2px",
                    color: "rgba(252,252,252,0.35)",
                    fontWeight: 600,
                    marginBottom: "20px",
                    textTransform: "uppercase",
                  }}
                >
                  {col.heading}
                </p>
                {col.links.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleLink(link)}
                    className="footer-link"
                    style={{
                      fontSize: "14px",
                      color: "rgba(252,252,252,0.55)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      display: "block",
                      marginBottom: "14px",
                      textAlign: "left",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      ;(e.currentTarget as HTMLButtonElement).style.color = "#ECFBA9"
                    }}
                    onMouseLeave={(e) => {
                      ;(e.currentTarget as HTMLButtonElement).style.color =
                        "rgba(252,252,252,0.55)"
                    }}
                  >
                    {link.label}
                    {(link as any).comingSoon && (
                      <span
                        className="ml-2 text-xs"
                        style={{ color: "rgba(252,252,252,0.25)" }}
                      >
                        (Coming Soon)
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div
          className="footer-bottom"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p style={{ fontSize: "13px", color: "rgba(252,252,252,0.35)" }}>
            © 2026 AdOptimize. All rights reserved.
          </p>

          {/* Social icons */}
          <div style={{ display: "flex", gap: "16px" }}>
            <a
              href="https://linkedin.com/in/markoodak"
              target="_blank"
              rel="noreferrer"
              style={{
                color: "rgba(252,252,252,0.4)",
                transition: "color 0.2s ease",
                cursor: "pointer",
              }}
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
              style={{
                color: "rgba(252,252,252,0.4)",
                transition: "color 0.2s ease",
                cursor: "pointer",
              }}
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
