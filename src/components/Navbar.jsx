// src/components/Navbar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, logout, user } = useAuth();

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <img src={assets.logo ?? "/logo.png"} alt="Logo" className="h-10 object-contain" />
        </div>

        {/* Menu */}
        <div className="flex items-center gap-8">
          <NavLink to="/" className={({ isActive }) => `font-medium ${isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-gray-700 hover:text-blue-600"}`}>Home</NavLink>

          <NavLink to="/cars" className={({ isActive }) => `font-medium ${isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-gray-700 hover:text-blue-600"}`}>Cars</NavLink>

          <NavLink to="/my-bookings" className={({ isActive }) => `font-medium ${isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-gray-700 hover:text-blue-600"}`}>My Booking</NavLink>

          <div className="relative">
            <input type="text" placeholder="Search car..." className="pl-3 pr-3 py-1 border border-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          {token ? (
            <>
              <NavLink to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">Dashboard</NavLink>
              <button
                onClick={() => { logout(); navigate("/"); }}
                className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* List Car is regular link; route itself is protected */}
              <NavLink to="/list-car" className="text-gray-700 hover:text-blue-600 font-medium">List Car</NavLink>
              <NavLink to="/login" className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition">Login</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
