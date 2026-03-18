import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import ConnectAccountModal from "@/components/dashboard/ConnectAccountModal";
import { BarChart2, Calendar } from "lucide-react";

const AnalyticsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [connectModalOpen, setConnectModalOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1 overflow-hidden lg:ml-[210px]">
        <TopBar onMenuClick={() => setSidebarOpen(true)} onConnectClick={() => setConnectModalOpen(true)} />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
                <p className="text-sm text-muted-foreground mt-1">Deep dive into your ad performance data</p>
              </div>
              <button className="flex items-center gap-2 border border-neutral-200 dark:border-neutral-700 rounded-lg px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                <Calendar size={16} />
                Last 30 days
              </button>
            </div>

            <div className="flex flex-col items-center justify-center py-24 text-center">
              <BarChart2 size={48} className="text-muted-foreground mb-4" />
              <h2 className="text-lg font-semibold text-foreground mb-2">No analytics data yet</h2>
              <p className="text-sm text-muted-foreground max-w-md">Connect an ad account to start seeing your performance analytics</p>
              <button
                onClick={() => setConnectModalOpen(true)}
                className="flex items-center gap-2 bg-[hsl(var(--color-teal))] text-[hsl(var(--color-lime))] font-semibold rounded-lg px-4 py-2 text-sm hover:opacity-90 transition mt-6"
              >
                Connect an account
              </button>
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

export default AnalyticsPage;
