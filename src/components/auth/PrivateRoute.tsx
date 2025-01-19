import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LoadingPage } from "@/components/loading/LoadingPage";

export function PrivateRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingPage />;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
}