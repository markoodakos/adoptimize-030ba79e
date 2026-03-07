import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export interface AnalysisTarget {
  platform: "Facebook" | "Instagram" | "YouTube";
  name: string;
}

interface AIAnalysisPanelProps {
  target: AnalysisTarget | null;
  onClose: () => void;
}

const mockInsights: Record<
  AnalysisTarget["platform"],
  Array<{ color: string; title: string; body: string }>
> = {
  Facebook: [
    {
      color: "hsl(var(--color-teal))",
      title: "High Frequency Warning",
      body: "Your ads are being shown 6.2x per user. Reduce frequency to avoid ad fatigue.",
    },
    {
      color: "hsl(var(--color-lime))",
      title: "Audience Overlap Detected",
      body: "3 of your ad sets share 60%+ audience overlap, splitting budget inefficiently.",
    },
    {
      color: "#f59e0b",
      title: "Creative Refresh Needed",
      body: "CTR has dropped 18% over 14 days. Rotating new creatives could recover performance.",
    },
  ],
  Instagram: [
    {
      color: "hsl(var(--color-teal))",
      title: "Story Placement Outperforming",
      body: "Story placements have 2.4x higher CTR than feed. Consider shifting budget allocation.",
    },
    {
      color: "hsl(var(--color-lime))",
      title: "Peak Hours Opportunity",
      body: "Engagement spikes between 7–9 PM. Scheduling ads in this window may improve results.",
    },
    {
      color: "#f59e0b",
      title: "Hashtag Relevance Low",
      body: "Current hashtag sets have low discovery rate. Updating tags could expand reach by 30%.",
    },
  ],
  YouTube: [
    {
      color: "hsl(var(--color-teal))",
      title: "Skip Rate Too High",
      body: "68% of viewers skip before 5 seconds. Lead with your key message in the first 3s.",
    },
    {
      color: "hsl(var(--color-lime))",
      title: "View-Through Rate Declining",
      body: "VTR dropped from 42% to 31% this month. Shorter 15s formats may improve completion.",
    },
    {
      color: "#f59e0b",
      title: "Targeting Too Broad",
      body: "Age range 18–65 is diluting spend. Narrowing to 25–44 could improve CTR by 22%.",
    },
  ],
};

const AIAnalysisPanel = ({ target, onClose }: AIAnalysisPanelProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!target) return;
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [target]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!target) return null;

  const handleReanalyze = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-foreground/20 z-40" />

      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-[380px] bg-card border-l border-border z-50 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border flex-shrink-0">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">AI Analysis</span>
            <span className="text-xs text-muted-foreground">{target.platform} · {target.name}</span>
          </div>
          <X
            size={18}
            className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors cursor-pointer"
            onClick={onClose}
          />
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center gap-4 h-full">
              <div className="w-full px-6 flex flex-col gap-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="text-center">
                <span className="text-xs text-muted-foreground">Analyzing your ad account with AI…</span>
              </div>
            </div>
          ) : (
            <div className="p-6 flex flex-col gap-6">
              {/* Score Card */}
              <div className="bg-background rounded-xl border border-border p-4">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">Overall Score</span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-bold text-foreground">72</span>
                  <span className="text-sm text-muted-foreground">out of 100</span>
                </div>
                <div className="mt-3 h-2 w-full bg-border rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "72%" }} />
                </div>
              </div>

              {/* Insights */}
              <div>
                <div className="mb-3">
                  <span className="text-sm font-semibold text-foreground">Key Insights</span>
                </div>
                {mockInsights[target.platform].map((insight, i) => (
                  <div key={i} className="flex items-start gap-3 mb-4">
                    <div
                      className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: insight.color }}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">{insight.title}</span>
                      <span className="text-xs text-muted-foreground mt-0.5">{insight.body}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-border flex-shrink-0">
          <button
            className="flex-1 border border-[hsl(var(--color-teal))] text-[hsl(var(--color-teal))] hover:bg-[hsl(var(--color-teal))] hover:text-[hsl(var(--color-lime))] rounded-lg px-4 py-2 text-sm font-medium transition-colors cursor-pointer"
            onClick={handleReanalyze}
          >
            Re-analyze
          </button>
          <button
            className="flex-1 bg-[hsl(var(--color-teal))] text-[hsl(var(--color-lime))] hover:opacity-90 rounded-lg px-4 py-2 text-sm font-medium transition-opacity cursor-pointer"
            onClick={() => console.log("Export report for:", target.name)}
          >
            Export Report
          </button>
        </div>
      </div>
    </>
  );
};

export default AIAnalysisPanel;
