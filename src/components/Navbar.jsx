// src/components/Navbar.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAuth } from "../context/AuthContext";
import { useCars } from "../context/CarContext"; // 👈 we’ll wire search with car context

const Navbar = () => {
  const navigate = useNavigate();
  const { user, token, logout } = useAuth();
  const { setSearchQuery } = useCars(); // 👈 inject search handler from Cars

  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSearchQuery(value); // update cars list filtering
  };

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        
        {/* Logo */}
        <div className="flex items-center pl-4">
          <NavLink to="/">
            <img
              src={assets.logo ?? "/logo.png"}
              alt="Logo"
              className="h-10 object-contain cursor-pointer"
            />
          </NavLink>
        </div>

        {/* Menu */}
        <div className="flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-medium ${
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-gray-700 hover:text-blue-600"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/cars"
            className={({ isActive }) =>
              `font-medium ${
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-gray-700 hover:text-blue-600"
              }`
            }
          >
            Cars
          </NavLink>

          <NavLink
            to="/my-bookings"
            className={({ isActive }) =>
              `font-medium ${
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-gray-700 hover:text-blue-600"
              }`
            }
          >
            My Bookings
          </NavLink>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search car..."
              value={query}
              onChange={handleSearch}
              className="pl-3 pr-3 py-1 border border-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Auth-based menu */}
          {user && token ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `font-medium ${
                    isActive
                      ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                      : "text-gray-700 hover:text-blue-600"
                  }`
                }
              >
                Dashboard
              </NavLink>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/list-car"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                List Car
              </NavLink>
              <NavLink
                to="/login"
                className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition"
              >
                Login
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
