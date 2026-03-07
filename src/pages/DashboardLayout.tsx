import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import StatCards from "@/components/dashboard/StatCards";
import ChartsRow from "@/components/dashboard/ChartsRow";
import AdAccountsTable from "@/components/dashboard/AdAccountsTable";
import AIAnalysisPanel, { type AnalysisTarget } from "@/components/dashboard/AIAnalysisPanel";

const DashboardLayout = () => {
  const [analysisTarget, setAnalysisTarget] = useState<AnalysisTarget | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1 overflow-hidden lg:ml-[210px]">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-8">
            <div className="mb-6"><StatCards /></div>
            <div className="mt-6"><ChartsRow /></div>
            <div className="mt-6"><AdAccountsTable onAnalyze={setAnalysisTarget} /></div>
          </div>
        </main>
      </div>
      <AIAnalysisPanel target={analysisTarget} onClose={() => setAnalysisTarget(null)} />
    </div>
  );
};

export default DashboardLayout;
