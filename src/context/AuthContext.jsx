// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiFetch } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // login: call server and set token only on success
  const login = async (email, password) => {
    const data = await apiFetch("/api/auth/login", { method: "POST", body: { email, password } });
    if (!data || !data.token) throw new Error("Invalid login response");
    setToken(data.token);
    setUser(data.user || null);
    return data;
  };

  // signup: register then auto-login
  const signup = async (name, email, password) => {
    await apiFetch("/api/auth/signup", { method: "POST", body: { name, email, password } });
    // if signup successful, auto-login
    return login(email, password);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({ token, user, login, signup, logout }), [token, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
