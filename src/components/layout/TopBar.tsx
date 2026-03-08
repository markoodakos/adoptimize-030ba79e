import { useState, useEffect } from "react";
import { Search, Bell, Sun, Moon, Menu, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TopBarProps {
  onMenuClick: () => void;
}

const TopBar = ({ onMenuClick }: TopBarProps) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("adoptimize-theme");
    setIsDark(stored === "dark");
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("adoptimize-theme", next ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-10 h-16 bg-background border-b border-border border-b-neutral-100 dark:border-b-neutral-800 px-6 flex items-center gap-2 w-full">
      {/* 1. Hamburger — mobile only */}
      <button
        onClick={onMenuClick}
        className="block lg:hidden p-1.5 rounded-md text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors flex-shrink-0"
      >
        <Menu size={20} />
      </button>

      {/* 2. Search */}
      <div className="relative hidden min-[420px]:flex min-[420px]:w-full md:w-[180px] lg:w-[280px]">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          placeholder="Search anything..."
          className="pl-8 bg-card border-border rounded-btn text-sm"
        />
      </div>

      {/* Right group */}
      <div className="ml-auto flex items-center gap-2">
        {/* 3. Support */}
        <button className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
          <HelpCircle size={18} />
          <span className="hidden lg:inline text-sm">Support</span>
        </button>

        {/* 4. Bell */}
        <button className="text-foreground/60 hover:text-foreground transition-colors">
          <Bell size={18} />
        </button>

        {/* 5. Theme toggle */}
        <button
          onClick={toggleTheme}
          className="text-foreground/60 hover:text-foreground transition-colors"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* 6. Avatar only */}
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 cursor-pointer">
          <span className="text-xs font-medium text-primary-foreground">JD</span>
        </div>

        {/* Connect Account — hidden below lg */}
        <Button
          className="hidden lg:flex bg-nearblack text-offwhite hover:bg-nearblack/90 rounded-pill text-sm font-medium px-4 py-2"
        >
          + Connect Account
        </Button>
      </div>
    </header>
  );
};

export default TopBar;
