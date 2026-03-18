import { useState } from "react";
import { Facebook, Instagram, Youtube, Loader2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { AnalysisTarget } from "./AIAnalysisPanel";

interface Account {
  id: number;
  platform: "Facebook" | "Instagram" | "YouTube";
  account: string;
  campaigns: number;
  spend: string;
  ctr: number;
  status: "Active" | "Paused";
}

interface AdAccountsTableProps {
  onAnalyze: (target: AnalysisTarget) => void;
  searchQuery: string;
  onConnectClick?: () => void;
}

const accounts: Account[] = [
  { id: 1, platform: "Facebook", account: "Nike Campaign", campaigns: 8, spend: "$4,200", ctr: 4.2, status: "Active" },
  { id: 2, platform: "Instagram", account: "Adidas Stories", campaigns: 5, spend: "$3,100", ctr: 3.1, status: "Active" },
  { id: 3, platform: "YouTube", account: "Puma Pre-roll", campaigns: 3, spend: "$2,800", ctr: 1.8, status: "Paused" },
  { id: 4, platform: "Facebook", account: "Reebok Feed", campaigns: 6, spend: "$1,500", ctr: 2.7, status: "Active" },
  { id: 5, platform: "Instagram", account: "Under Armour", campaigns: 4, spend: "$900", ctr: 0.9, status: "Paused" },
];

const platformIcon = (platform: Account["platform"]) => {
  switch (platform) {
    case "Facebook": return <Facebook size={14} />;
    case "Instagram": return <Instagram size={14} />;
    case "YouTube": return <Youtube size={14} />;
  }
};

const ctrPill = (ctr: number) => {
  let classes = "rounded-[var(--radius-pill)] px-2 py-0.5 text-xs font-medium inline-block";
  if (ctr > 3) classes += " bg-success/15 text-success";
  else if (ctr >= 1) classes += " bg-warning/15 text-warning";
  else classes += " bg-destructive/15 text-destructive";
  return <span className={classes}>{ctr}%</span>;
};

const statusPill = (status: Account["status"]) => {
  const base = "rounded-[var(--radius-pill)] px-2 py-0.5 text-xs font-medium inline-block";
  const color = status === "Active" ? "bg-success/15 text-success" : "bg-warning/15 text-warning";
  return <span className={`${base} ${color}`}>{status}</span>;
};

const AdAccountsTable = ({ onAnalyze, searchQuery, onConnectClick }: AdAccountsTableProps) => {
  const [analyzingId, setAnalyzingId] = useState<number | null>(null);
  const [modal, setModal] = useState<{ accountName: string; content: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const { toast } = useToast();

  const filteredAccounts = accounts.filter((account) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      account.platform.toLowerCase().includes(q) ||
      account.account.toLowerCase().includes(q)
    );
  });

  const handleCopy = async () => {
    if (!modal) return;
    await navigator.clipboard.writeText(modal.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  const handleAnalyze = async (account: { id: number; account: string; platform: string; spend: string }) => {
    setAnalyzingId(account.id);
    const spendNumber = parseFloat(account.spend.replace(/\$/g, "").replace(/,/g, ""));

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const anonKey = (supabase as any).supabaseKey as string;

      const response = await fetch(
        "https://pelhygeorscmqhtiruuz.supabase.co/functions/v1/analyze-ad-account",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${anonKey}`,
            "apikey": anonKey
          },
          body: JSON.stringify({
            accountName: account.account,
            platform:    account.platform,
            spend:       spendNumber,
            impressions: 80000,
            clicks:      1200,
            conversions: 45
          })
        }
      );

      const data = await response.json();

      console.log("Edge function response:", data);
      console.log("Response status:", response.status, response.ok);

      if (!response.ok || !data.success) {
        console.error("Analysis error:", data);
        throw new Error(data.message ?? "Analysis failed");
      }

      setModal({ accountName: account.account, content: data.recommendations });
    } catch {
      toast({ title: "Analysis failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setAnalyzingId(null);
    }
  };

  return (
    <div>
      {/* Section Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg text-neutral-900 dark:text-neutral-100">Ad Accounts</h2>
        <button className="bg-[hsl(var(--color-teal))] text-[hsl(var(--color-lime))] rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer">
          + Connect Account
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-100 dark:border-neutral-800 w-full overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="min-w-[640px] w-full">
            <thead>
              <tr className="bg-neutral-50 dark:bg-neutral-800/60 border-b border-neutral-100 dark:border-neutral-800">
                {["Platform", "Account", "Campaigns", "Spend", "CTR", "Status", "Actions"].map((h) => (
                  <th key={h} className={`text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide px-4 py-3 text-left${h === "Actions" ? " min-w-[100px]" : ""}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-sm text-neutral-400 dark:text-neutral-500">
                    No accounts found matching your search.
                  </td>
                </tr>
              ) : (
                filteredAccounts.map((account, index) => (
                <tr
                  key={account.id}
                  className={`
                    ${index % 2 === 0 ? "bg-neutral-50 dark:bg-neutral-800/40" : "bg-white dark:bg-neutral-900"}
                    hover:bg-neutral-100 dark:hover:bg-neutral-800/70
                    ${index === filteredAccounts.length - 1 ? "border-b-0" : "border-b border-neutral-100 dark:border-neutral-800"}
                    transition-colors duration-150
                  `}
                >
                  <td className="px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300">
                    <div className="flex items-center gap-2">
                      <span className="bg-neutral-100 dark:bg-neutral-800 p-1.5 rounded-md">{platformIcon(account.platform)}</span>
                      <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{account.platform}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300">{account.account}</td>
                  <td className="px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300">{account.campaigns}</td>
                  <td className="px-4 py-3 text-sm font-medium text-neutral-900 dark:text-neutral-100">{account.spend}</td>
                  <td className="px-4 py-3 text-sm">{ctrPill(account.ctr)}</td>
                  <td className="px-4 py-3 text-sm">{statusPill(account.status)}</td>
                  <td className="px-4 py-3 text-sm min-w-[100px]">
                    <button
                      onClick={() => handleAnalyze(account)}
                      disabled={analyzingId === account.id}
                      className="border border-[hsl(var(--color-teal))] text-[hsl(var(--color-teal))] hover:bg-[hsl(var(--color-teal))] hover:text-[hsl(var(--color-lime))] rounded-lg px-3 py-1 text-xs font-medium transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 min-w-[90px] justify-center"
                    >
                      {analyzingId === account.id ? (
                        <>
                          <Loader2 size={12} className="animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        "Analyze"
                      )}
                    </button>
                  </td>
                </tr>
              ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModal(null)} />
            <div
              className="relative z-10 w-full max-w-lg mx-4 rounded-2xl bg-[hsl(var(--color-teal))] text-white shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <h3 className="text-base font-semibold">
                  AI Recommendations — {modal.accountName}
                </h3>
                <button onClick={() => setModal(null)} className="text-white/50 hover:text-white/90 transition-colors cursor-pointer">
                  <X size={18} />
                </button>
              </div>
              <div className="px-6 py-5 max-h-[60vh] overflow-y-auto space-y-2 text-sm leading-relaxed text-white/90">
                {modal.content.split("\n").map((line, i) => {
                  const isNumbered = /^\d+\./.test(line.trim());
                  return (
                    <p key={i} className={isNumbered ? "font-medium text-[hsl(var(--color-lime))]" : ""}>
                      {line}
                    </p>
                  );
                })}
              </div>
              <div className="px-6 py-4 border-t flex justify-end gap-3" style={{ borderColor: "#00454A" }}>
                <button
                  onClick={handleCopy}
                  className="text-sm px-4 py-2 rounded-lg font-medium transition-opacity hover:opacity-80"
                  style={{ background: "#ECFBA9", color: "#00454A" }}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button
                  onClick={() => setModal(null)}
                  className="text-sm px-4 py-2 rounded-lg font-medium transition-opacity hover:opacity-80"
                  style={{ background: "#00454A", color: "#ECFBA9" }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdAccountsTable;
