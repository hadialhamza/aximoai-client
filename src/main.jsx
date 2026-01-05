import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import router from "./routes/Router.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import SmoothScroll from "./providers/SmoothScroll.jsx";
import { ThemeProvider } from "./providers/ThemeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <SmoothScroll>
          <RouterProvider router={router} />
        </SmoothScroll>
      </AuthProvider>
    </ThemeProvider>
    <ToastContainer />
  </StrictMode>
);
