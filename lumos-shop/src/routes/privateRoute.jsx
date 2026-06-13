import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export function PrivateRoute({ adminOnly = false }) {
    const { isAuthenticated, isAdmin, loadingAuth } = useAuth();

    if (loadingAuth) {
        return (
            <main className="flex min-h-screen items-center justify-center">
                <p>Carregando...</p>
            </main>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && !isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}