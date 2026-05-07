import { createContext, useEffect, useContext, useState} from "react";
import { loginRequest, meRequest } from "../services/authServices";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(() => {
        async function loadUser() {
            const storedUser = localStorage.getItem("user");

            if (!storedUser) {
                setUser(null);
                setLoadingAuth(false);
                return;
            }

            try {
                const userData = await meRequest();

                localStorage.setItem("user", JSON.stringify(userData));
                setUser(userData);
            } catch (error) {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                setUser(null);
            } finally {
                setLoadingAuth(false);
            }
        }

        loadUser();
    }, []);

    async function login(email, password) {
        const data = await loginRequest(email, password);

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        setUser(data.user);

        return data;
    }

    function logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        setUser(null);
    }

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            loadingAuth,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }

    return context;
}