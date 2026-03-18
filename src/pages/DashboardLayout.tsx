import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import NotificationsPanel from "@/components/layout/NotificationsPanel";
import ConnectAccountModal from "@/components/dashboard/ConnectAccountModal";
import SupportModal from "@/components/layout/SupportModal";
import StatCards from "@/components/dashboard/StatCards";
import ChartsRow from "@/components/dashboard/ChartsRow";
import AdAccountsTable from "@/components/dashboard/AdAccountsTable";
import AIAnalysisPanel, { type AnalysisTarget } from "@/components/dashboard/AIAnalysisPanel";

const DashboardLayout = () => {
  const [analysisTarget, setAnalysisTarget] = useState<AnalysisTarget | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Nike Campaign CTR dropped below 2%", time: "2 hours ago", read: false },
    { id: 2, message: "Reebok Feed spend limit at 85%", time: "5 hours ago", read: false },
    { id: 3, message: "Puma Pre-roll has exited learning phase", time: "1 day ago", read: false },
    { id: 4, message: "Adidas Stories conversion rate improved +12%", time: "2 days ago", read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1 overflow-hidden lg:ml-[210px]">
        <TopBar onMenuClick={() => setSidebarOpen(true)} searchQuery={searchQuery} onSearchChange={setSearchQuery} unreadCount={unreadCount} onBellClick={() => setNotifOpen(prev => !prev)} onConnectClick={() => setConnectModalOpen(true)} onSupportClick={() => setSupportModalOpen(true)} />
        <NotificationsPanel isOpen={notifOpen} onClose={() => setNotifOpen(false)} notifications={notifications} onMarkAllRead={handleMarkAllRead} />
        <ConnectAccountModal isOpen={connectModalOpen} onClose={() => setConnectModalOpen(false)} />
        <SupportModal isOpen={supportModalOpen} onClose={() => setSupportModalOpen(false)} />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-8">
            <div className="mb-6"><StatCards /></div>
            <div className="mt-6"><ChartsRow /></div>
            <div className="mt-6"><AdAccountsTable onAnalyze={setAnalysisTarget} searchQuery={searchQuery} onConnectClick={() => setConnectModalOpen(true)} /></div>
          </div>
        </main>
      </div>
      <AIAnalysisPanel target={analysisTarget} onClose={() => setAnalysisTarget(null)} />
    </div>
  );
};

export default DashboardLayout;
