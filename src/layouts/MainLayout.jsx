import { Outlet } from "react-router";
import Navbar from "../components/shared/navbar/Navbar";
import Footer from "../components/shared/footer/Footer";

const MainLayout = () => {
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
