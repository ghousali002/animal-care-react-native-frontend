import React, { createContext, useState, useContext, useEffect } from "react";

// Create Context
const AuthContext = createContext();

// Custom hook to use the context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Context Provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [role, setRole] = useState(null);

  const login = (user) => {
    setIsLoggedIn(true);
    setUserData(JSON.parse(user));
  };
  useEffect(() => {
    if (userData) {
      setRole(userData?.role);
    }
  }, [userData]);

  const logout = () => {
    setIsLoggedIn(false);
    setUserData(null);
  };

  useEffect(() => {
    console.log(userData, ";;;");
  }, [userData]);

  return (
    <AuthContext.Provider value={{ isLoggedIn,setUserData, userData, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
