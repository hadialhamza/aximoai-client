import { createBrowserRouter } from "react-router";
import MainLayout from "@/layouts/MainLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import ModelDetails from "@/pages/modelDetails/ModelDetails";
import EditModel from "@/pages/updateModel/UpdateModel";
import HomePage from "@/pages/home/HomePage";
import Dashboard from "@/pages/dashboard/Dashboard";
import Login from "@/pages/login/Login";
import Register from "@/pages/register/Register";
import AllModels from "@/pages/allModels/AllModels";
import AddModel from "@/pages/addModel/AddModel";
import MyPurchase from "@/pages/myPurchase/MyPurchase";
import MyModels from "@/pages/myModels/MyModels";
import ErrorPage from "@/pages/errorPage/ErrorPage";
import Contact from "@/pages/contact/Contact";
import Profile from "@/pages/dashboard/Profile";

// create a variable for router with create browser router
const router = createBrowserRouter([
  {
    // layouts will be mentioned here
    path: "/", // path: "/" will be the root path
    element: <MainLayout />, // this is main layout
    errorElement: <ErrorPage />, // this is error 404 page

    // children will render in the middle of the layout in outlet section
    children: [
      {
        index: true, // index true will be the default page
        element: <HomePage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "models",
        element: <AllModels />,
      },
      {
        path: "models/:id",
        element: (
          <PrivateRoute>
            <ModelDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "my-models",
        element: <MyModels />,
      },
      {
        path: "add-model",
        element: <AddModel />,
      },
      {
        path: "update-model/:id",
        element: <EditModel />,
      },
      {
        path: "my-purchase",
        element: <MyPurchase />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

export default router;
