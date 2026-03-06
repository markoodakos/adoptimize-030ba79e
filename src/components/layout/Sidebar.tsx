import { useEffect, useState } from "react";
import { LayoutDashboard, CreditCard, Megaphone, BarChart2, Settings } from "lucide-react";
import logoLight from "@/assets/brand/adoptimize_logo_light.svg";
import logoDark from "@/assets/brand/adoptimize_logo_dark.svg";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: CreditCard, label: "Ad Accounts", active: false },
  { icon: Megaphone, label: "Campaigns", active: false },
  { icon: BarChart2, label: "Analytics", active: false },
  { icon: Settings, label: "Settings", active: false },
];

const Sidebar = () => {
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
    <aside className="w-[220px] h-screen flex-shrink-0 flex flex-col bg-sidebar-bg border-r border-border p-6 px-4 overflow-y-auto">
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
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-pill text-sm transition-all duration-200 ${
              item.active
                ? "bg-accent text-accent-foreground font-medium"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            <item.icon size={16} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* User block */}
      <div className="mt-auto flex items-center gap-2 pt-6">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-medium text-primary-foreground">JD</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">John D.</span>
          <span className="bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded-pill w-fit">
            Admin
          </span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
