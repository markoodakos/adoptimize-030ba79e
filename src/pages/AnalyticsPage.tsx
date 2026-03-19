import { useState, useRef, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import ConnectAccountModal from "@/components/dashboard/ConnectAccountModal";
import SupportModal from "@/components/layout/SupportModal";
import NotificationsPanel from "@/components/layout/NotificationsPanel";
import { BarChart2, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid,
  Tooltip, Legend,
  ResponsiveContainer
} from "recharts";

const dateOptions = ["Last 7 days", "Last 30 days", "Last 90 days", "This year"];

const impressionsData = [
  { day: "Jan 1", value: 28000 }, { day: "Jan 2", value: 32000 }, { day: "Jan 3", value: 27000 },
  { day: "Jan 4", value: 35000 }, { day: "Jan 5", value: 41000 }, { day: "Jan 6", value: 38000 },
  { day: "Jan 7", value: 30000 }, { day: "Jan 8", value: 33000 }, { day: "Jan 9", value: 39000 },
  { day: "Jan 10", value: 44000 }, { day: "Jan 11", value: 36000 }, { day: "Jan 12", value: 31000 },
  { day: "Jan 13", value: 28000 }, { day: "Jan 14", value: 29000 }, { day: "Jan 15", value: 35000 },
  { day: "Jan 16", value: 40000 }, { day: "Jan 17", value: 43000 }, { day: "Jan 18", value: 37000 },
  { day: "Jan 19", value: 32000 }, { day: "Jan 20", value: 27000 }, { day: "Jan 21", value: 30000 },
  { day: "Jan 22", value: 34000 }, { day: "Jan 23", value: 38000 }, { day: "Jan 24", value: 45000 },
  { day: "Jan 25", value: 42000 }, { day: "Jan 26", value: 39000 }, { day: "Jan 27", value: 35000 },
  { day: "Jan 28", value: 31000 }, { day: "Jan 29", value: 36000 }, { day: "Jan 30", value: 40000 },
];

const ctrData = [
  { week: "Week 1", facebook: 4.2, instagram: 3.8, youtube: 2.1 },
  { week: "Week 2", facebook: 4.8, instagram: 4.1, youtube: 2.4 },
  { week: "Week 3", facebook: 5.2, instagram: 4.6, youtube: 2.8 },
  { week: "Week 4", facebook: 5.8, instagram: 5.1, youtube: 3.2 },
];

const topCampaigns = [
  { campaign: "Summer Sale 2026", platform: "Facebook", impressions: "320K", clicks: "15,360", ctr: 4.8, conversions: 580 },
  { campaign: "Retargeting Flow", platform: "Facebook", impressions: "180K", clicks: "9,180", ctr: 5.1, conversions: 420 },
  { campaign: "Brand Awareness Q1", platform: "Instagram", impressions: "290K", clicks: "9,280", ctr: 3.2, conversions: 310 },
  { campaign: "Holiday Push", platform: "Facebook", impressions: "210K", clicks: "8,190", ctr: 3.9, conversions: 290 },
  { campaign: "Product Launch", platform: "YouTube", impressions: "198K", clicks: "4,158", ctr: 2.1, conversions: 240 },
];

const statCards = [
  { label: "Total Impressions", value: "1.2M", trend: "+12% vs last period", variant: "success" },
  { label: "Total Clicks", value: "48,400", trend: "+8% vs last period", variant: "success" },
  { label: "Avg. CTR", value: "3.8%", trend: "+0.4% vs last period", variant: "success" },
  { label: "Total Conversions", value: "1,840", trend: "+15% vs last period", variant: "success" },
];

const AnalyticsPage = () => {
  const { toast } = useToast();
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
  const [dateOpen, setDateOpen] = useState(false);
  const [dateRange, setDateRange] = useState("Last 30 days");
  const dateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dateRef.current && !dateRef.current.contains(e.target as Node)) {
        setDateOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1 overflow-hidden lg:ml-[210px]">
        <TopBar onMenuClick={() => setSidebarOpen(true)} onConnectClick={() => setConnectModalOpen(true)} unreadCount={unreadCount} onBellClick={() => setNotifOpen(prev => !prev)} onSupportClick={() => setSupportModalOpen(true)} currentRoute="/analytics" />
        <NotificationsPanel isOpen={notifOpen} onClose={() => setNotifOpen(false)} notifications={notifications} onMarkAllRead={handleMarkAllRead} />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
                <p className="text-sm text-muted-foreground mt-1">Deep dive into your ad performance data</p>
              </div>
              <div className="relative" ref={dateRef}>
                <button
                  onClick={() => setDateOpen(prev => !prev)}
                  className="flex items-center gap-2 border border-neutral-200 dark:border-neutral-700 rounded-lg px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                >
                  <Calendar size={16} />
                  {dateRange}
                </button>
                {dateOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-card shadow-lg z-50 py-1">
                    {dateOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setDateRange(option);
                          setDateOpen(false);
                          toast({
                            title: "Date range updated",
                            description: "Data will reflect once accounts are connected.",
                          });
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          dateRange === option
                            ? "bg-[hsl(var(--color-teal))]/10 text-[hsl(var(--color-teal))] font-medium"
                            : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* STAT CARDS ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {statCards.map((card, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-5">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{card.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{card.value}</p>
                  <span className="text-xs text-success mt-1 inline-block">{card.trend}</span>
                </div>
              ))}
            </div>

            {/* CHARTS ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Impressions Over Time */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-1">Impressions Over Time</h3>
                <p className="text-xs text-muted-foreground mb-4">Last 30 days</p>
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={impressionsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" tickFormatter={(v: string, i: number) => i % 5 === 0 ? v : ""} axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                    <YAxis tickFormatter={(v: number) => v >= 1000 ? `${v / 1000}K` : String(v)} axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="hsl(174, 100%, 14%)" fill="hsl(174, 100%, 14%)" fillOpacity={0.1} strokeWidth={2} name="Impressions" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* CTR by Platform */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-1">CTR by Platform</h3>
                <p className="text-xs text-muted-foreground mb-4">This month</p>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={ctrData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                    <YAxis tickFormatter={(v: number) => `${v}%`} domain={[0, 6]} axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="facebook" fill="hsl(174, 100%, 14%)" radius={[4, 4, 0, 0]} name="Facebook" />
                    <Bar dataKey="instagram" fill="hsl(74, 92%, 82%)" radius={[4, 4, 0, 0]} name="Instagram" />
                    <Bar dataKey="youtube" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} name="YouTube" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* TOP CAMPAIGNS TABLE */}
            <div className="rounded-xl border border-border bg-card">
              <div className="px-5 py-4 border-b border-border">
                <h3 className="text-sm font-semibold text-foreground">Top Performing Campaigns</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      {["Campaign", "Platform", "Impressions", "Clicks", "CTR", "Conversions"].map(col => (
                        <th key={col} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {topCampaigns.map((row, index) => (
                      <tr key={index} className={`border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors ${index % 2 === 0 ? "bg-card" : "bg-muted/20"}`}>
                        <td className="px-4 py-3 text-foreground font-medium">{row.campaign}</td>
                        <td className="px-4 py-3 text-muted-foreground">{row.platform}</td>
                        <td className="px-4 py-3 text-foreground">{row.impressions}</td>
                        <td className="px-4 py-3 text-foreground">{row.clicks}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                            row.ctr > 3
                              ? "bg-success/15 text-success"
                              : row.ctr >= 1
                                ? "bg-warning/15 text-warning"
                                : "bg-destructive/15 text-destructive"
                          }`}>
                            {row.ctr}%
                          </span>
                        </td>
                        <td className="px-4 py-3 text-foreground">{row.conversions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
      <ConnectAccountModal isOpen={connectModalOpen} onClose={() => setConnectModalOpen(false)} />
      <SupportModal isOpen={supportModalOpen} onClose={() => setSupportModalOpen(false)} />
    </div>
  );
};

export default AnalyticsPage;
