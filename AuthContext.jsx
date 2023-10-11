// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(
//     !!localStorage.getItem("access_token")
//   );

//   const login = () => {
//     setIsLoggedIn(true);
//     localStorage.setItem("access_token", access);
//   };

//   const logout = () => {
//     setIsLoggedIn(false);
//     localStorage.removeItem("access_token");
//   };

//   useEffect(() => {
//     if (localStorage.getItem("access_token")) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );

  const login = (access) => {
    setIsLoggedIn(true);
    localStorage.setItem("access_token", access);

    // You should also store the token expiration time here
    const expirationTime = calculateTokenExpiration();
    localStorage.setItem("token_expiration", expirationTime);
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_expiration");
  };

  useEffect(() => {
    // Check token expiration during initialization
    const tokenIsExpired = checkTokenExpiration();

    if (tokenIsExpired) {
      logout();
    }
  }, []);

  // Function to calculate token expiration time (e.g., 1 hour from now)
  const calculateTokenExpiration = () => {
    const now = new Date();
    now.setHours(now.getHours() + 1); // Set the expiration time, e.g., 1 hour from now
    return now.getTime().toString();
  };

  // Function to check if the token has expired
  const checkTokenExpiration = () => {
    const token = localStorage.getItem("access_token");
    const expirationTime = localStorage.getItem("token_expiration");

    if (!token || !expirationTime) {
      return true; // No token or expiration time means it's expired
    }

    const now = new Date().getTime();
    return now >= parseInt(expirationTime, 10);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
