import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { assets } from "../assets/assets";

export default function DashboardLayout({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogoClick = () => {
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center pl-4 cursor-pointer hover:opacity-80 transition-opacity" onClick={handleLogoClick}>
            <img 
              src={assets.logo} 
              className="h-10 w-auto object-contain" 
              alt="EliteCarRental"
            />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg">
          <div className="p-6">
            {/* User Profile */}
            <div className="flex flex-col items-center mb-8">
              <img src={assets.user_profile1} className="w-16 h-16 rounded-full object-cover mb-2" />
              <span className="text-sm font-medium text-gray-700">{user?.name || "het"}</span>
            </div>
            
            {/* Navigation */}
            <nav className="space-y-1">
              <Item to="/dashboard" label="Dashboard" icon={assets.dashboard_icon} currentPath={location.pathname} />
              <Item to="/dashboard/add-car" label="Add car" icon={assets.add_car_icon} currentPath={location.pathname} />
              <Item to="/dashboard/manage-cars" label="Manage Cars" icon={assets.manage_cars_icon} currentPath={location.pathname} />
              <Item to="/dashboard/manage-bookings" label="Manage Bookings" icon={assets.manage_bookings_icon} currentPath={location.pathname} />
            </nav>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-8 bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}

function Item({ to, label, icon, currentPath }) {
  const isActive = currentPath === to;
  
  return (
    <NavLink
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors relative ${
        isActive 
          ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600" 
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      <img src={icon} className="w-5 h-5" alt="" />
      {label}
    </NavLink>
  );
}


