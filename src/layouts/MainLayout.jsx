import { Outlet } from "react-router";
import Navbar from "../components/shared/navbar/Navbar";
import Footer from "../components/shared/footer/Footer";
import useAuth from "@/hooks/useAuth";
import PageLoader from "@/components/ui/loading/PageLoader";

const MainLayout = () => {
  const { loading } = useAuth();

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div>
      {/* Navbar */}
      <Navbar />
      {/* Outlet (children of this layout will be rendered here) */}
      <Outlet />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
