import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { useUIStore } from "../store/uiStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000
});

// Request interceptor
api.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  const { startLoading } = useUIStore.getState();

  startLoading();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => {
    const { stopLoading } = useUIStore.getState();
    stopLoading();
    return response;
  },
  (error) => {
    const { stopLoading, showSnackbar } = useUIStore.getState();
    const { logout } = useAuthStore.getState();

    stopLoading();

    // Network error
    if (!error.response) {
      showSnackbar(
        "Network error. Please check WiFi connection.",
        "error"
      );
      return Promise.reject(error);
    }

    const status = error.response.status;

    if (status === 400) {
      showSnackbar(error.response.data?.message || "Bad request.", "warning");
      return Promise.reject(error);
    }

    if (status === 401) {
      showSnackbar("Session expired. Please login again.", "warning");
      logout();
      return Promise.reject(error);
    }

    if (status >= 500) {
      showSnackbar("Server error. Please try again later.", "error");
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;