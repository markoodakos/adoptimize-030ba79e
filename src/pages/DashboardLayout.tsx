import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import StatCards from "@/components/dashboard/StatCards";
import ChartsRow from "@/components/dashboard/ChartsRow";
import AdAccountsTable from "@/components/dashboard/AdAccountsTable";
import AIAnalysisPanel, { type AnalysisTarget } from "@/components/dashboard/AIAnalysisPanel";

const DashboardLayout = () => {
  const [analysisTarget, setAnalysisTarget] = useState<AnalysisTarget | null>(null);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="p-6">
            <StatCards />
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
