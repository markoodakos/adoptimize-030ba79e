import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import { Megaphone, Filter } from "lucide-react";

const CampaignsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1 overflow-hidden lg:ml-[210px]">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Campaigns</h1>
                <p className="text-sm text-muted-foreground mt-1">Track and manage all your active campaigns</p>
              </div>
              <button className="flex items-center gap-2 border border-neutral-200 dark:border-neutral-700 rounded-lg px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                <Filter size={16} />
                Filter
              </button>
            </div>

            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Megaphone size={48} className="text-muted-foreground mb-4" />
              <h2 className="text-lg font-semibold text-foreground mb-2">No campaigns yet</h2>
              <p className="text-sm text-muted-foreground max-w-md">Your campaigns will appear here once you connect an ad account</p>
              <button
                onClick={() => navigate("/ad-accounts")}
                className="flex items-center gap-2 bg-[hsl(var(--color-teal))] text-[hsl(var(--color-lime))] font-semibold rounded-lg px-4 py-2 text-sm hover:opacity-90 transition mt-6"
              >
                Connect an account
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CampaignsPage;
