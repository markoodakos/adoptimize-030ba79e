import { useState } from "react";
import { X, Globe, Camera, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ConnectAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConnectAccountModal = ({ isOpen, onClose }: ConnectAccountModalProps) => {
  const { toast } = useToast();
  const [activeTile, setActiveTile] = useState<string | null>(null);

  const handleClose = () => {
    setActiveTile(null);
    onClose();
  };

  if (!isOpen) return null;

  const platforms = [
    { id: "facebook", label: "Facebook Ads", icon: Globe },
    { id: "instagram", label: "Instagram Ads", icon: Camera },
    { id: "youtube", label: "YouTube Ads", icon: Play },
  ];

  const handleTileClick = (platformLabel: string, platformId: string) => {
    setActiveTile(platformId);
    toast({
      title: `${platformLabel} integration coming soon`,
      description: "We'll notify you when this platform is available.",
    });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
        <div
          className="relative z-10 w-full max-w-md mx-4 rounded-2xl bg-[hsl(var(--color-teal))] text-foreground shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between px-6 pt-6 pb-2">
            <div>
              <h3 className="text-lg font-semibold text-[hsl(var(--color-offwhite))]">
                Connect Ad Account
              </h3>
              <p className="text-sm text-[hsl(var(--color-offwhite))] opacity-70 mt-1">
                Choose a platform to connect your advertising account
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-[hsl(var(--color-offwhite))] opacity-50 hover:opacity-90 transition-opacity cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Platform tiles */}
          <div className="grid grid-cols-3 gap-3 px-6 py-6">
            {platforms.map((platform) => {
              const Icon = platform.icon;
              const isActive = activeTile === platform.id;
              return (
                <button
                  key={platform.id}
                  onClick={() => handleTileClick(platform.label, platform.id)}
                  className="relative flex flex-col items-center justify-center gap-3 rounded-xl py-6 px-4 transition-all duration-200 cursor-pointer"
                  style={{
                    background: "rgba(0, 69, 74, 0.15)",
                    border: isActive ? "1px solid #ECFBA9" : "1px solid #00454A",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "#00454A";
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(0, 69, 74, 0.30)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "#00454A";
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(0, 69, 74, 0.15)";
                    }
                  }}
                >
                  <Icon size={28} className="text-[hsl(var(--color-lime))]" />
                  <span className="text-xs font-medium text-[hsl(var(--color-offwhite))]">
                    {platform.label}
                  </span>
                  {isActive && (
                    <span className="absolute top-2 right-2 text-[9px] font-bold uppercase tracking-wide bg-[hsl(var(--color-lime))] text-[hsl(var(--color-teal))] rounded-full px-2 py-0.5">
                      Soon
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t flex justify-end" style={{ borderColor: "#00454A" }}>
            <button
              onClick={handleClose}
              className="text-sm px-4 py-2 rounded-lg font-medium transition-opacity hover:opacity-80 cursor-pointer"
              style={{ background: "#00454A", color: "#ECFBA9" }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectAccountModal;
