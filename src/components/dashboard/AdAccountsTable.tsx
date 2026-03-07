import { Facebook, Instagram, Youtube } from "lucide-react";

interface Account {
  id: number;
  platform: "Facebook" | "Instagram" | "YouTube";
  account: string;
  campaigns: number;
  spend: string;
  ctr: number;
  status: "Active" | "Paused";
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
    case "Facebook":
      return <Facebook size={14} />;
    case "Instagram":
      return <Instagram size={14} />;
    case "YouTube":
      return <Youtube size={14} />;
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

const AdAccountsTable = () => {
  return (
    <div>
      {/* Section Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg text-neutral-900 dark:text-neutral-100">Ad Accounts</h2>
        <button
          className="bg-[hsl(var(--color-teal))] text-[hsl(var(--color-lime))] rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer"
        >
          + Connect Account
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-100 dark:border-neutral-800 w-full overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-neutral-50 dark:bg-neutral-800/60 border-b border-neutral-100 dark:border-neutral-800">
              {["Platform", "Account", "Campaigns", "Spend", "CTR", "Status", "Actions"].map((h) => (
                <th key={h} className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide px-4 py-3 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, index) => (
              <tr
                key={account.id}
                className={`
                  ${index % 2 === 0 ? "bg-neutral-50 dark:bg-neutral-800/40" : "bg-white dark:bg-neutral-900"}
                  hover:bg-neutral-100 dark:hover:bg-neutral-800/70
                  ${index === accounts.length - 1 ? "border-b-0" : "border-b border-neutral-100 dark:border-neutral-800"}
                  transition-colors duration-150
                `}
              >
                {/* Platform */}
                <td className="px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300">
                  <div className="flex items-center gap-2">
                    <span className="bg-neutral-100 dark:bg-neutral-800 p-1.5 rounded-md">
                      {platformIcon(account.platform)}
                    </span>
                    <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {account.platform}
                    </span>
                  </div>
                </td>
                {/* Account */}
                <td className="px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300">{account.account}</td>
                {/* Campaigns */}
                <td className="px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300">{account.campaigns}</td>
                {/* Spend */}
                <td className="px-4 py-3 text-sm font-medium text-neutral-900 dark:text-neutral-100">{account.spend}</td>
                {/* CTR */}
                <td className="px-4 py-3 text-sm">{ctrPill(account.ctr)}</td>
                {/* Status */}
                <td className="px-4 py-3 text-sm">{statusPill(account.status)}</td>
                {/* Actions */}
                <td className="px-4 py-3 text-sm">
                  <button
                    onClick={() => console.log("Analyze:", account.account)}
                    className="border border-[hsl(var(--color-teal))] text-[hsl(var(--color-teal))] hover:bg-[hsl(var(--color-teal))] hover:text-[hsl(var(--color-lime))] rounded-lg px-3 py-1 text-xs font-medium transition-colors duration-150 cursor-pointer"
                  >
                    Analyze
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdAccountsTable;
