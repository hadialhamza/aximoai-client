import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import router from "./routes/Router.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import SmoothScroll from "./providers/SmoothScroll.jsx";
import { ThemeProvider } from "./providers/ThemeProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <SmoothScroll>
            <RouterProvider router={router} />
          </SmoothScroll>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
    <ToastContainer />
  </StrictMode>
);
