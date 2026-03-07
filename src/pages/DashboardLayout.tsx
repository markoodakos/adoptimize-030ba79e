import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import StatCards from "@/components/dashboard/StatCards";
import ChartsRow from "@/components/dashboard/ChartsRow";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="p-6">
            <StatCards />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
