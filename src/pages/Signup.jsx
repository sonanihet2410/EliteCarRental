// src/pages/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { assets } from "../assets/assets";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password) {
      setError("Please complete all fields.");
      return;
    }

    setLoading(true);
    try {
      await signup(form.name, form.email, form.password); // will auto-login on success
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 py-12 bg-white">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <div className="flex items-center gap-3 mb-6">
         <h2 className="text-2xl font-bold">Create account</h2>
        </div>

        {error && <p className="mb-3 text-red-600 text-sm">{error}</p>}

        <form onSubmit={onSubmit} className="space-y-4">
          <input name="name" type="text" placeholder="Full name" value={form.name} onChange={onChange} className="w-full border rounded-lg px-4 py-3 focus:outline-none" required />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} className="w-full border rounded-lg px-4 py-3 focus:outline-none" required />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} className="w-full border rounded-lg px-4 py-3 focus:outline-none" required />
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white rounded-lg py-3 font-medium hover:bg-blue-700">
            {loading ? "Creating..." : "Sign up"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </section>
  );
}
