import { useEffect, useState } from "react";
import { LayoutDashboard, CreditCard, Megaphone, BarChart2, Tag, Settings, X, LogOut } from "lucide-react";
import logoLight from "@/assets/brand/adoptimize_logo_light.svg";
import logoDark from "@/assets/brand/adoptimize_logo_dark.svg";
import { supabase } from "@/integrations/supabase/client";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { profile, getInitials } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );

  const navItems = [
    { label: "Overview", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Ad Accounts", icon: CreditCard, path: "/ad-accounts" },
    { label: "Campaigns", icon: Megaphone, path: "/campaigns" },
    { label: "Analytics", icon: BarChart2, path: "/analytics" },
    { label: "Pricing", icon: Tag, path: "/pricing" },
    { label: "Settings", icon: Settings, path: "/settings" },
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

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
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`
                  w-full flex items-center gap-3
                  px-3 py-2.5 rounded-lg text-sm
                  font-medium transition-all
                  ${isActive
                    ? "bg-[hsl(var(--color-lime))] text-[hsl(var(--color-teal))]"
                    : "text-[hsl(var(--color-teal))]/70 dark:text-white/70 hover:bg-black/10 dark:hover:bg-white/10 hover:text-[hsl(var(--color-teal))] dark:hover:text-white"
                  }
                `}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            );
          })}
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
        <div className="mt-auto flex items-center justify-between pt-6">
          <div className="flex items-center gap-2">
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-[hsl(var(--color-teal))] text-white dark:bg-[hsl(var(--color-lime))] dark:text-[hsl(var(--color-teal))] flex items-center justify-center flex-shrink-0">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <span className="text-xs font-medium">
                  {getInitials(profile?.full_name ?? profile?.email ?? null)}
                </span>
              )}
            </div>

            {/* Name */}
            <span className="text-sm font-medium text-[hsl(var(--color-teal))] dark:text-white truncate max-w-[100px]">
              {profile?.full_name ?? profile?.email ?? "Account"}
            </span>
          </div>

          {/* Sign out button */}
          <button
            onClick={handleSignOut}
            className="text-[hsl(var(--color-teal))]/60 dark:text-white/60 hover:text-destructive dark:hover:text-destructive transition-colors flex-shrink-0"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
