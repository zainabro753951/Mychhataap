import React, { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode library

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    console.log(token);

    if (token) {
      const decodedToken = jwtDecode(token); // Decode the token to extract user information

      setAuthUser(decodedToken); // Set the decoded token as authUser
    }
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
