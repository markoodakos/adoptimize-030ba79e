import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import ConnectAccountModal from "@/components/dashboard/ConnectAccountModal";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Sun, Moon } from "lucide-react";

const SettingsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("adoptimize-theme", "light");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("adoptimize-theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1 overflow-hidden lg:ml-[210px]">
        <TopBar onMenuClick={() => setSidebarOpen(true)} onConnectClick={() => setConnectModalOpen(true)} />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Settings</h1>
                <p className="text-sm text-muted-foreground mt-1">Manage your account and preferences</p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {/* Profile */}
              <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
                <h2 className="font-semibold text-base text-neutral-900 dark:text-neutral-100 mb-4">Profile</h2>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Full name</label>
                    <input
                      disabled
                      value={profile?.full_name ?? ""}
                      className="w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-sm text-foreground disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Email</label>
                    <input
                      disabled
                      value={profile?.email ?? ""}
                      className="w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-sm text-foreground disabled:opacity-60"
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">Profile editing coming soon</p>
              </div>

              {/* Appearance */}
              <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
                <h2 className="font-semibold text-base text-neutral-900 dark:text-neutral-100 mb-4">Appearance</h2>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-foreground">Theme</p>
                    <p className="text-xs text-muted-foreground">Choose your preferred theme</p>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                  >
                    {isDark ? <><Moon size={16} /> Dark</> : <><Sun size={16} /> Light</>}
                  </button>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-white dark:bg-neutral-900 rounded-xl border border-red-200 dark:border-red-900/30 p-6">
                <h2 className="font-semibold text-base text-red-500 mb-4">Danger Zone</h2>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-foreground">Sign out</p>
                    <p className="text-xs text-muted-foreground">Sign out of your AdOptimize account</p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="border border-red-200 dark:border-red-800 text-red-500 rounded-lg px-4 py-2 text-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <ConnectAccountModal
        isOpen={connectModalOpen}
        onClose={() => setConnectModalOpen(false)}
      />
    </div>
  );
};

export default SettingsPage;
