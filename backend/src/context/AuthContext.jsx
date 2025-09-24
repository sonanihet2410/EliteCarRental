// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Check for existing auth on app start
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (err) {
        // Clear invalid data
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
      }
    }
  }, []);

  // BASE API URL (adjust if backend runs elsewhere)
  const API_URL = "http://localhost:5000/api/auth";

  const signup = async (name, email, password) => {
    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Signup failed");
      }

      const data = await res.json();
      setUser(data.user);
      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      }
      localStorage.setItem("user", JSON.stringify(data.user));
      return data;
    } catch (err) {
      throw err;
    }
  };

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Login failed");
      }

      const data = await res.json();
      setUser(data.user);
      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      }
      localStorage.setItem("user", JSON.stringify(data.user));
      return data;
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    setToken(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
