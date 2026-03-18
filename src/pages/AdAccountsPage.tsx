import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import ConnectAccountModal from "@/components/dashboard/ConnectAccountModal";
import { CreditCard } from "lucide-react";

const AdAccountsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [connectModalOpen, setConnectModalOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1 overflow-hidden lg:ml-[210px]">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-foreground">Ad Accounts</h1>
              <p className="text-sm text-muted-foreground mt-1">Manage your connected advertising accounts</p>
            </div>

            <div className="flex flex-col items-center justify-center py-24 text-center">
              <CreditCard size={48} className="text-muted-foreground mb-4" />
              <h2 className="text-lg font-semibold text-foreground mb-2">No ad accounts connected</h2>
              <p className="text-sm text-muted-foreground max-w-md">Connect your first Facebook, Instagram or YouTube account to get started</p>
              <button
                onClick={() => setConnectModalOpen(true)}
                className="flex items-center gap-2 bg-[hsl(var(--color-teal))] text-[hsl(var(--color-lime))] font-semibold rounded-lg px-4 py-2 text-sm hover:opacity-90 transition mt-6"
              >
                + Connect Account
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

export default AdAccountsPage;
