import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import ConnectAccountModal from "@/components/dashboard/ConnectAccountModal";
import SupportModal from "@/components/layout/SupportModal";
import NotificationsPanel from "@/components/layout/NotificationsPanel";
import { CreditCard, Globe, Camera, Play, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const accounts = [
  { id: 1, platform: "Facebook", account: "Nike Campaign", campaigns: 8, spend: "$4,200", ctr: 4.2, status: "Active" },
  { id: 2, platform: "Instagram", account: "Adidas Stories", campaigns: 5, spend: "$3,100", ctr: 3.1, status: "Active" },
  { id: 3, platform: "YouTube", account: "Puma Pre-roll", campaigns: 3, spend: "$2,800", ctr: 1.8, status: "Paused" },
  { id: 4, platform: "Facebook", account: "Reebok Feed", campaigns: 6, spend: "$1,500", ctr: 2.7, status: "Active" },
  { id: 5, platform: "Instagram", account: "Under Armour", campaigns: 4, spend: "$900", ctr: 0.9, status: "Paused" },
];

const AdAccountsPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [analyzingId, setAnalyzingId] = useState<number | null>(null);
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

  const handleAnalyze = (accountName: string, id: number) => {
    setAnalyzingId(id);
    setTimeout(() => {
      setAnalyzingId(null);
      toast({
        title: "Analysis unavailable",
        description: "Connect your account to run AI analysis.",
      });
    }, 1500);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onConnectClick={() => setConnectModalOpen(true)} />
      <div className="flex flex-col flex-1 overflow-hidden lg:ml-[210px]">
        <TopBar onMenuClick={() => setSidebarOpen(true)} onConnectClick={() => setConnectModalOpen(true)} unreadCount={unreadCount} onBellClick={() => setNotifOpen(prev => !prev)} onSupportClick={() => setSupportModalOpen(true)} searchQuery={searchQuery} onSearchChange={setSearchQuery} currentRoute="/ad-accounts" />
        <NotificationsPanel isOpen={notifOpen} onClose={() => setNotifOpen(false)} notifications={notifications} onMarkAllRead={handleMarkAllRead} />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-foreground">Ad Accounts</h1>
              <p className="text-sm text-muted-foreground mt-1">Manage your connected advertising accounts</p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-border bg-card">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {["Platform", "Account", "Campaigns", "Spend", "CTR", "Status", "Actions"].map((col) => (
                      <th key={col} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((account, index) => {
                    const Icon = account.platform === "Facebook" ? Globe : account.platform === "Instagram" ? Camera : Play;

                    return (
                      <tr key={account.id} className={`border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors ${index % 2 === 0 ? "bg-card" : "bg-muted/20"}`}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-[hsl(var(--color-teal))]/10">
                              <Icon size={14} className="text-[hsl(var(--color-teal))]" />
                            </div>
                            <span className="text-foreground font-medium">{account.platform}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-foreground">{account.account}</td>
                        <td className="px-4 py-3 text-muted-foreground">{account.campaigns}</td>
                        <td className="px-4 py-3 text-foreground font-medium">{account.spend}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                            account.ctr > 3
                              ? "bg-success/15 text-success"
                              : account.ctr >= 1
                                ? "bg-warning/15 text-warning"
                                : "bg-destructive/15 text-destructive"
                          }`}>
                            {account.ctr}%
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${account.status === "Active" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}>
                            {account.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleAnalyze(account.account, account.id)}
                            disabled={analyzingId === account.id}
                            className="border border-[hsl(var(--color-teal))] text-[hsl(var(--color-teal))] hover:bg-[hsl(var(--color-teal))] hover:text-[hsl(var(--color-lime))] rounded-lg px-3 py-1 text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 min-w-[90px] justify-center"
                          >
                            {analyzingId === account.id ? (
                              <>
                                <Loader2 size={12} className="animate-spin" />
                                Analyzing...
                              </>
                            ) : "Analyze"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      <ConnectAccountModal isOpen={connectModalOpen} onClose={() => setConnectModalOpen(false)} />
      <SupportModal isOpen={supportModalOpen} onClose={() => setSupportModalOpen(false)} />
    </div>
  );
};

export default AdAccountsPage;
