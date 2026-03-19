import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import logoDark from "@/assets/brand/adoptimize_logo_dark.svg"

interface NavbarProps {
  onContactClick: () => void
}

const Navbar = ({ onContactClick }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) =>
      setIsLoggedIn(!!session)
    )
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_e, session) => setIsLoggedIn(!!session)
    )
    return () => subscription.unsubscribe()
  }, [])

  const scrollTo = (id: string) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  const navLinks = [
    { label: "Home", action: () => scrollTo("hero") },
    { label: "About", action: () => scrollTo("about") },
    {
      label: "Pricing",
      action: () => {
        setMobileOpen(false)
        navigate("/pricing")
      },
    },
    {
      label: "Contact",
      action: () => {
        setMobileOpen(false)
        onContactClick()
      },
    },
  ]

  return (
    <>
      {/* Fixed navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(6,6,6,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(252,252,252,0.06)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo("hero")} className="flex-shrink-0">
            <img src={logoDark} alt="AdOptimize" className="h-7" />
          </button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={link.action}
                className="text-sm font-medium transition-colors"
                style={{ color: "rgba(252,252,252,0.7)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.color = "#FCFCFC")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.color =
                    "rgba(252,252,252,0.7)")
                }
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: "#ECFBA9", color: "#060606" }}
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-sm font-medium transition-colors"
                  style={{
                    color: "rgba(252,252,252,0.7)",
                    border: "1px solid rgba(252,252,252,0.2)",
                    borderRadius: "8px",
                  }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-4 py-2 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{
                    background: "#ECFBA9",
                    color: "#060606",
                    borderRadius: "8px",
                  }}
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden p-2"
            style={{ color: "#FCFCFC" }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            style={{ background: "rgba(6,6,6,0.6)" }}
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <div
            className="fixed top-0 right-0 z-50 w-72 h-full flex flex-col px-6 pt-16 pb-8"
            style={{ background: "#0a0a0a" }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-2"
              style={{ color: "#FCFCFC" }}
            >
              <X size={20} />
            </button>

            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={link.action}
                className="text-left py-3 text-base font-medium"
                style={{ color: "rgba(252,252,252,0.8)" }}
              >
                {link.label}
              </button>
            ))}

            <div className="mt-auto flex flex-col gap-3">
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    setMobileOpen(false)
                    navigate("/dashboard")
                  }}
                  className="w-full py-2.5 rounded-lg text-sm font-semibold"
                  style={{ background: "#ECFBA9", color: "#060606" }}
                >
                  Go to Dashboard
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setMobileOpen(false)
                      navigate("/login")
                    }}
                    className="w-full py-2.5 rounded-lg text-sm font-medium"
                    style={{
                      border: "1px solid rgba(252,252,252,0.2)",
                      color: "#FCFCFC",
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setMobileOpen(false)
                      navigate("/signup")
                    }}
                    className="w-full py-2.5 rounded-lg text-sm font-semibold"
                    style={{ background: "#ECFBA9", color: "#060606" }}
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Navbar
