import { createContext, useEffect, useContext, useState } from "react";
import { loginRequest, meRequest } from "../services/authServices";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "ADMIN";

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("token");

      if (!token) {
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

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setUser(data.user);

    return data;
  }

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        loadingAuth,
        login,
        logout,
      }}
    >
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
