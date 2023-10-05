import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(false);

  useEffect(() => {
    // check if there is access token
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      setUser({ isAuthenticated: true });
    }
  }, []);

  const login = () => {
    setUser({ isAuthenticated: true });
  };

  const logout = () => {
    setUser({ isAuthenticated: false });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_id");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
