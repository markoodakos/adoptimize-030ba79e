import { useState, useRef, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import ConnectAccountModal from "@/components/dashboard/ConnectAccountModal";
import SupportModal from "@/components/layout/SupportModal";
import NotificationsPanel from "@/components/layout/NotificationsPanel";
import { BarChart2, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const dateOptions = ["Last 7 days", "Last 30 days", "Last 90 days", "This year"];

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
        <TopBar onMenuClick={() => setSidebarOpen(true)} onConnectClick={() => setConnectModalOpen(true)} />
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
