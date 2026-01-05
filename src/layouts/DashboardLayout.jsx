import { Outlet } from "react-router";
import Sidebar from "@/components/dashboard/Sidebar";
import TopNavbar from "@/components/dashboard/TopNavbar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-base-200">
      {/* Sidebar - Fixed width */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <div className="shrink-0 sticky top-0 z-40">
          <TopNavbar />
        </div>

        {/* Scrollable Page Content */}
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
