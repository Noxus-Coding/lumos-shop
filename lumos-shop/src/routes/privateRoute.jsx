import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContext.jsx";

export function PrivateRoute() {
  const { isAuthenticated, loadingAuth } = useAuth();

  if (loadingAuth) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}