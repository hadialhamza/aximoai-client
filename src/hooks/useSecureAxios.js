import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

// create instance of axios call
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

// custom hook for call axios with authorization header for secure apis
const useSecureAxios = () => {
  // import user information from context
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Add request interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        const token = user?.accessToken;
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor (optional: handle 401/403)
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          await logout();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount or user change
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logout, navigate]);

  return axiosInstance;
};

export default useSecureAxios;
