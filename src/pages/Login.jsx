// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { assets } from "../assets/assets";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Please fill both fields.");
      return;
    }
    setLoading(true);
    try {
      await login(form.email, form.password); // throws on bad credentials
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 py-12 bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold">Login</h2>
        </div>

        {error && <p className="mb-3 text-red-600 text-sm">{error}</p>}

        <form onSubmit={onSubmit} className="space-y-4">
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} className="w-full border rounded-lg px-4 py-3 focus:outline-none" required />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} className="w-full border rounded-lg px-4 py-3 focus:outline-none" required />
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white rounded-lg py-3 font-medium hover:bg-blue-700">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don’t have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </section>
  );
}
