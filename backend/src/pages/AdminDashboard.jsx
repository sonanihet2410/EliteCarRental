import React, { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import DashboardLayout from "../components/DashboardLayout";
import { assets } from "../assets/assets";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ cars: 0, bookings: 0, pending: 0, completed: 0, revenue: 0 });
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const cars = await apiFetch("/api/cars");
        const allBookings = await apiFetch("/api/bookings", { auth: true });
        const bookings = allBookings.bookings || [];
        const pending = bookings.filter(b => b.status === "pending").length;
        const completed = bookings.filter(b => b.status === "completed" || b.status === "confirmed").length;
        const revenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
        setStats({ cars: cars.length, bookings: bookings.length, pending, completed, revenue });
        setRecent(bookings.slice(0, 5));
      } catch (_) {}
    })();
  }, []);

  return (
    <DashboardLayout>
      <div className="py-2">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Admin Dashboard</h1>
          <p className="text-sm text-gray-600">Monitor overall platform performance including total cars, bookings, revenue, and recent activities</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard 
            label="Total Cars" 
            value={stats.cars} 
            icon={assets.car_icon}
            color="blue"
          />
          <StatCard 
            label="Total Bookings" 
            value={stats.bookings} 
            icon={assets.manage_bookings_icon}
            color="green"
          />
          <StatCard 
            label="Pending" 
            value={stats.pending} 
            icon={assets.cautionIconColored}
            color="yellow"
          />
          <StatCard 
            label="Confirmed" 
            value={stats.completed} 
            icon={assets.check_icon}
            color="green"
          />
        </div>

        {/* Content Sections */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="mb-3">
              <h3 className="text-base font-semibold text-gray-900">Recent Bookings</h3>
              <p className="text-xs text-gray-600">Latest customer bookings</p>
            </div>
            <div className="space-y-4">
              {recent.length > 0 ? (
                recent.map(b => (
                  <div key={b._id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center gap-3">
                      <img src={b.car?.image?.startsWith('/uploads/') ? `http://localhost:5000${b.car.image}` : b.car?.image}
                        className="w-10 h-8 object-cover rounded" alt="Car" />
                      <div>
                        <div className="font-medium text-gray-900">{b.car?.name}</div>
                        <div className="text-sm text-gray-500">{new Date(b.startDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">₹{b.totalPrice}</div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        b.status === "confirmed" ? "bg-green-100 text-green-700" : 
                        b.status === "pending" ? "bg-yellow-100 text-yellow-700" : 
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {b.status}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <img src={assets.manage_bookings_icon} className="w-12 h-12 mx-auto mb-2 opacity-50" alt="No bookings" />
                  <p>No recent bookings</p>
                </div>
              )}
            </div>
          </div>

          {/* Monthly Revenue */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="mb-3">
              <h3 className="text-base font-semibold text-gray-900">Monthly Revenue</h3>
              <p className="text-xs text-gray-600">Revenue for current month</p>
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-1">₹{stats.revenue}</div>
            <div className="text-xs text-gray-500">Total earnings this month</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ label, value, icon, color }) {
  const colorClasses = {
    blue: "text-blue-600 bg-blue-50",
    green: "text-green-600 bg-green-50", 
    yellow: "text-yellow-600 bg-yellow-50",
    red: "text-red-600 bg-red-50"
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gray-600 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <img src={icon} className="w-5 h-5" alt={label} />
        </div>
      </div>
    </div>
  );
}


