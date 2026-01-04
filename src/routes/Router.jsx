import { createBrowserRouter } from "react-router";
import MainLayout from "@/layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";
import ModelDetails from "@/pages/modelDetails/ModelDetails";
import EditModel from "@/pages/updateModel/UpdateModel";
import HomePage from "@/pages/home/HomePage";
import Login from "@/pages/login/Login";
import Register from "@/pages/register/Register";
import AllModels from "@/pages/allModels/AllModels";
import AddModel from "@/pages/addModel/AddModel";
import MyPurchase from "@/pages/myPurchase/MyPurchase";
import MyModels from "@/pages/myModels/MyModels";
import ErrorPage from "@/pages/errorPage/ErrorPage";

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
        path: "models",
        element: <AllModels />,
      },
      {
        path: "add-model",
        element: (
          <PrivateRoute>
            <AddModel />,
          </PrivateRoute>
        ),
      },
      {
        path: "models/:id",
        element: (
          <PrivateRoute>
            <ModelDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "update-model/:id",
        element: (
          <PrivateRoute>
            <EditModel />
          </PrivateRoute>
        ),
      },
      {
        path: "my-purchase",
        element: (
          <PrivateRoute>
            <MyPurchase />
          </PrivateRoute>
        ),
      },
      {
        path: "my-models",
        element: (
          <PrivateRoute>
            <MyModels />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
