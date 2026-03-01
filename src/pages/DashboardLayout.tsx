import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto bg-background flex items-center justify-center">
          <p className="text-sm italic text-foreground/40">
            Dashboard content coming soon
          </p>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
