import { useState, useRef, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import ConnectAccountModal from "@/components/dashboard/ConnectAccountModal";
import SupportModal from "@/components/layout/SupportModal";
import NotificationsPanel from "@/components/layout/NotificationsPanel";
import { Megaphone, Filter, Globe, Camera, Play } from "lucide-react";

const platforms = ["All Platforms", "Facebook", "Instagram", "YouTube"];

const campaigns = [
  { id: 1, campaign: "Summer Sale 2026", platform: "Facebook", account: "Nike Campaign", budget: "$2,000", spent: "$1,240", ctr: 4.8, status: "Active" },
  { id: 2, campaign: "Brand Awareness Q1", platform: "Instagram", account: "Adidas Stories", budget: "$1,500", spent: "$980", ctr: 3.2, status: "Active" },
  { id: 3, campaign: "Product Launch", platform: "YouTube", account: "Puma Pre-roll", budget: "$3,000", spent: "$2,100", ctr: 2.1, status: "Paused" },
  { id: 4, campaign: "Retargeting Flow", platform: "Facebook", account: "Reebok Feed", budget: "$800", spent: "$650", ctr: 5.1, status: "Active" },
  { id: 5, campaign: "Story Sequence", platform: "Instagram", account: "Under Armour", budget: "$600", spent: "$320", ctr: 1.4, status: "Paused" },
  { id: 6, campaign: "Holiday Push", platform: "Facebook", account: "Nike Campaign", budget: "$2,500", spent: "$890", ctr: 3.9, status: "Active" },
];

const CampaignsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
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
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All Platforms");
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCampaigns = activeFilter === "All Platforms"
    ? campaigns
    : campaigns.filter(c => c.platform === activeFilter);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onConnectClick={() => setConnectModalOpen(true)} />
      <div className="flex flex-col flex-1 overflow-hidden lg:ml-[210px]">
        <TopBar onMenuClick={() => setSidebarOpen(true)} onConnectClick={() => setConnectModalOpen(true)} unreadCount={unreadCount} onBellClick={() => setNotifOpen(prev => !prev)} onSupportClick={() => setSupportModalOpen(true)} currentRoute="/campaigns" />
        <NotificationsPanel isOpen={notifOpen} onClose={() => setNotifOpen(false)} notifications={notifications} onMarkAllRead={handleMarkAllRead} />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Campaigns</h1>
                <p className="text-sm text-muted-foreground mt-1">Track and manage all your active campaigns</p>
              </div>
              <div className="relative" ref={filterRef}>
                <button
                  onClick={() => setFilterOpen(prev => !prev)}
                  className="flex items-center gap-2 border border-neutral-200 dark:border-neutral-700 rounded-lg px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                >
                  <Filter size={16} />
                  {activeFilter === "All Platforms" ? "Filter" : `Filter: ${activeFilter}`}
                </button>
                {filterOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-card shadow-lg z-50 py-1">
                    {platforms.map((platform) => (
                      <button
                        key={platform}
                        onClick={() => {
                          setActiveFilter(platform);
                          setFilterOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          activeFilter === platform
                            ? "bg-[hsl(var(--color-teal))]/10 text-[hsl(var(--color-teal))] font-medium"
                            : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                        }`}
                      >
                        {platform}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {filteredCampaigns.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <Megaphone size={48} className="text-muted-foreground mb-4" />
                <h2 className="text-lg font-semibold text-foreground mb-2">No campaigns match this filter</h2>
                <p className="text-sm text-muted-foreground max-w-md">No {activeFilter} campaigns found. Connect an account to get started.</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-border bg-card">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      {["Campaign", "Platform", "Account", "Budget", "Spent", "CTR", "Status"].map((col) => (
                        <th key={col} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCampaigns.map((campaign, index) => {
                      const Icon = campaign.platform === "Facebook" ? Globe : campaign.platform === "Instagram" ? Camera : Play;

                      return (
                        <tr key={campaign.id} className={`border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors ${index % 2 === 0 ? "bg-card" : "bg-muted/20"}`}>
                          <td className="px-4 py-3 text-foreground font-medium">{campaign.campaign}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded-lg bg-[hsl(var(--color-teal))]/10">
                                <Icon size={14} className="text-[hsl(var(--color-teal))]" />
                              </div>
                              <span className="text-foreground font-medium">{campaign.platform}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">{campaign.account}</td>
                          <td className="px-4 py-3 text-foreground font-medium">{campaign.budget}</td>
                          <td className="px-4 py-3 text-foreground font-medium">{campaign.spent}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                              campaign.ctr > 3
                                ? "bg-success/15 text-success"
                                : campaign.ctr >= 1
                                  ? "bg-warning/15 text-warning"
                                  : "bg-destructive/15 text-destructive"
                            }`}>
                              {campaign.ctr}%
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${campaign.status === "Active" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}>
                              {campaign.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
      <ConnectAccountModal isOpen={connectModalOpen} onClose={() => setConnectModalOpen(false)} />
      <SupportModal isOpen={supportModalOpen} onClose={() => setSupportModalOpen(false)} />
    </div>
  );
};

export default CampaignsPage;
