import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRoute() {
  const { token, isSynced } = useAuthStore();
  const location = useLocation();

  // No token → Login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Token exists but not synced
  if (!isSynced && location.pathname !== "/sync") {
    return <Navigate to="/sync" replace />;
  }

  return <Outlet />;
}