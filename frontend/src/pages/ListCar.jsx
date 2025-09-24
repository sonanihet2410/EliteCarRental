// src/pages/ListCar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../lib/api";

export default function ListCar() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", type: "", year: "", image: "", pricePerDay: "", seats: "", fuel: "", transmission: "", location: "", description: ""
  });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      // auth: true will attach Authorization header (apiFetch reads token from localStorage)
      await apiFetch("/api/cars", { method: "POST", body: form, auth: true });
      navigate("/cars");
    } catch (error) {
      // Show server error (401 will say "Not authorized" if no token)
      setErr(error.message || "Failed to list car");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-6 md:px-16 lg:px-24 py-12">
      <h1 className="text-3xl font-bold mb-4">List your car</h1>
      {err && <p className="text-red-600 mb-4">{err}</p>}
      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 max-w-xl">
        <input name="name" placeholder="Car name" value={form.name} onChange={onChange} className="border p-2 rounded" required />
        <input name="type" placeholder="Type (SUV/Sedan...)" value={form.type} onChange={onChange} className="border p-2 rounded" />
        <input name="year" placeholder="Year" value={form.year} onChange={onChange} className="border p-2 rounded" />
        <input name="image" placeholder="Image URL" value={form.image} onChange={onChange} className="border p-2 rounded" />
        <input name="pricePerDay" placeholder="Price per day (INR)" value={form.pricePerDay} onChange={onChange} className="border p-2 rounded" required />
        <input name="seats" placeholder="Seats" value={form.seats} onChange={onChange} className="border p-2 rounded" />
        <input name="fuel" placeholder="Fuel" value={form.fuel} onChange={onChange} className="border p-2 rounded" />
        <input name="transmission" placeholder="Transmission" value={form.transmission} onChange={onChange} className="border p-2 rounded" />
        <input name="location" placeholder="Location" value={form.location} onChange={onChange} className="border p-2 rounded" />
        <textarea name="description" placeholder="Description" value={form.description} onChange={onChange} className="border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{loading ? "Listing..." : "List Your Car"}</button>
      </form>
    </section>
  );
}
