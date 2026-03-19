import { useEffect, useState } from "react";
import { Globe, Megaphone, MousePointer, Wallet, type LucideIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface StatCardBadge {
  label: string;
  variant: "success" | "warning";
}

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  sub: string;
  badge?: StatCardBadge;
}

const statCardsData: StatCardProps[] = [
  {
    icon: Globe,
    value: "3",
    label: "Connected Platforms",
    sub: "Facebook, Instagram, YouTube",
  },
  {
    icon: Megaphone,
    value: "27",
    label: "Active Campaigns",
    sub: "Across all platforms",
    badge: { label: "+4 this week", variant: "success" },
  },
  {
    icon: MousePointer,
    value: "3.8%",
    label: "Avg. CTR",
    sub: "Last 30 days",
    badge: { label: "+0.4%", variant: "success" },
  },
  {
    icon: Wallet,
    value: "$12,400",
    label: "Total Ad Spend",
    sub: "This month",
    badge: { label: "-$800 vs last month", variant: "warning" },
  },
];

const StatCard = ({ icon: Icon, value, label, sub, badge }: StatCardProps) => {
  return (
    <div className="bg-card text-card-foreground rounded-[var(--radius-card)] shadow-card p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="p-2 w-fit">
          <Icon size={18} className="text-teal" />
        </div>
        {badge && (
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-pill ${
              badge.variant === "success"
                ? "bg-success/15 text-success"
                : "bg-warning/15 text-warning"
            }`}
          >
            {badge.label}
          </span>
        )}
      </div>
      <p className="text-[32px] font-bold text-foreground leading-none">{value}</p>
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
      </div>
    </div>
  );
};

const StatCards = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const getName = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;
      const fullName = session.user.user_metadata?.full_name;
      if (fullName) { setUserName(fullName); return; }
      const email = session.user.email;
      if (email) { setUserName(email.split("@")[0]); return; }
      setUserName(null);
    };
    getName();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session?.user) { setUserName(null); return; }
      const fullName = session.user.user_metadata?.full_name;
      if (fullName) { setUserName(fullName); }
      else if (session.user.email) { setUserName(session.user.email.split("@")[0]); }
      else { setUserName(null); }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-foreground mb-1">
        {userName ? `Welcome back, ${userName}.` : "Welcome back!"}
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Here's how your ad accounts are performing.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCardsData.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>
    </div>
  );
};

export default StatCards;
