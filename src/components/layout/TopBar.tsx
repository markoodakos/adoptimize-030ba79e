import { useState, useEffect } from "react";
import { Search, Bell, Sun, Moon, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TopBar = () => {
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
    <header className="sticky top-0 z-10 h-16 bg-background border-b border-border px-6 flex items-center justify-between">
      {/* Search */}
      <div className="relative w-full max-w-[280px]">
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
      <div className="flex items-center gap-4">
        <span className="text-sm text-foreground/60 hover:text-foreground cursor-pointer transition-colors">
          Support
        </span>

        <button className="text-foreground/60 hover:text-foreground transition-colors">
          <Bell size={18} />
        </button>

        <button
          onClick={toggleTheme}
          className="text-foreground/60 hover:text-foreground transition-colors"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="flex items-center gap-1 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-medium text-primary-foreground">JD</span>
          </div>
          <span className="text-sm font-medium text-foreground">John D.</span>
          <ChevronDown size={14} className="text-foreground/60" />
        </div>

        <Button
          className="bg-nearblack text-offwhite hover:bg-nearblack/90 rounded-pill text-sm font-medium px-4 py-2"
        >
          + Connect Account
        </Button>
      </div>
    </header>
  );
};

export default TopBar;
