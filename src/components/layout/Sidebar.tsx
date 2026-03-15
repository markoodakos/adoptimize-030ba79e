import { useEffect, useState } from "react";
import { LayoutDashboard, CreditCard, Megaphone, BarChart2, Settings, X } from "lucide-react";
import logoLight from "@/assets/brand/adoptimize_logo_light.svg";
import logoDark from "@/assets/brand/adoptimize_logo_dark.svg";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: CreditCard, label: "Ad Accounts", active: false },
  { icon: Megaphone, label: "Campaigns", active: false },
  { icon: BarChart2, label: "Analytics", active: false },
  { icon: Settings, label: "Settings", active: false },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Backdrop — below lg only */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          w-[280px] lg:w-[210px]
          bg-[hsl(174,40%,94%)] dark:bg-[hsl(var(--color-teal))]
          shadow-2xl lg:shadow-none
          flex flex-col
          transition-transform duration-300
          ease-in-out
          lg:translate-x-0
          border-r border-[hsl(174,40%,85%)] dark:border-white/10
          p-6 px-4 overflow-y-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Close button — mobile only */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 text-foreground/60 hover:opacity-70 transition-opacity"
        >
          <X size={20} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2.5 pb-8">
          <img
            src={isDark ? logoDark : logoLight}
            alt="AdOptimize"
            className="h-7 w-auto object-contain object-left"
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                if (window.innerWidth < 1024) onClose();
              }}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-pill text-sm transition-all duration-200 ${
                item.active
                  ? "bg-accent text-[hsl(var(--color-teal))] dark:text-[hsl(var(--color-nearblack))] font-medium"
                  : "text-[hsl(var(--color-teal))] dark:text-white/70 hover:opacity-80"
              }`}
            >
              <item.icon size={16} className={item.active ? "" : "text-[hsl(var(--color-teal))]/70 dark:text-white/60"} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Mobile Connect Account */}
        <div className="lg:hidden mx-4 pt-4 mb-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full bg-[hsl(var(--color-teal))] text-[hsl(var(--color-lime))] dark:bg-[hsl(var(--color-lime))] dark:text-[hsl(var(--color-teal))] font-semibold text-sm rounded-lg py-2.5 hover:opacity-90 transition-opacity"
          >
            + Connect Account
          </button>
        </div>

        {/* User block */}
        <div className="mt-auto flex items-center gap-2 pt-6">
          <div className="w-8 h-8 rounded-full bg-[hsl(var(--color-teal))] text-white dark:bg-[hsl(var(--color-lime))] dark:text-[hsl(var(--color-teal))] flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-medium">JD</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-[hsl(var(--color-teal))] dark:text-white">John D.</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
