import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface Notification {
  id: number;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAllRead: () => void;
}

const NotificationsPanel = ({ isOpen, onClose, notifications, onMarkAllRead }: NotificationsPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Panel */}
      <div
        ref={panelRef}
        className="fixed top-16 right-4 z-50 w-80 rounded-card bg-card border border-border shadow-lg"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <span className="text-sm font-semibold text-foreground">Notifications</span>
          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllRead}
              className="text-xs text-primary hover:underline"
            >
              Mark all as read
            </button>
            <button
              onClick={onClose}
              className="text-neutral-400 dark:text-neutral-500 hover:text-foreground transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Notification list */}
        <div className="max-h-72 overflow-y-auto">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`px-4 py-3 border-b border-border last:border-b-0 ${
                !n.read ? "bg-primary/5" : ""
              }`}
              style={{
                borderColor: "#00454A",
                opacity: n.read ? 0.45 : 1,
                borderLeft: n.read
                  ? "3px solid transparent"
                  : `3px solid ${
                      document.documentElement
                        .classList.contains("dark")
                        ? "#ECFBA9"
                        : "#00454A"
                    }`
              }}
            >
              <p className="text-sm text-foreground">{n.message}</p>
              <span className="text-xs text-muted-foreground mt-1 block">{n.time}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NotificationsPanel;
