import React, { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import DashboardLayout from "../components/DashboardLayout";
import { assets } from "../assets/assets";

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      const data = await apiFetch("/api/bookings", { auth: true });
      setBookings(data.bookings || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const setStatus = async (id, status) => {
    await apiFetch(`/api/bookings/${id}/status`, { method: "PATCH", body: { status }, auth: true });
    load();
  };

  if (loading) return (
    <DashboardLayout>
      <div className="py-2">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    </DashboardLayout>
  );
  
  if (error) return (
    <DashboardLayout>
      <div className="py-2">
        <div className="text-red-500 text-center py-8">{error}</div>
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout>
      <div className="py-2">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Manage Bookings</h1>
          <p className="text-sm text-gray-600">Track all customer bookings, approve or cancel requests, and manage booking statuses.</p>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Car</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Date Range</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Total</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Payment</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.length > 0 ? (
                bookings.map(b => (
                  <tr key={b._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={b.car?.image?.startsWith('/uploads/') ? `http://localhost:5000${b.car.image}` : (b.car?.image || assets.car_image1)} 
                          className="w-16 h-12 object-cover rounded-lg" 
                          alt={b.car?.name}
                        />
                        <div>
                          <div className="font-medium text-gray-900">{b.car?.name}</div>
                          <div className="text-sm text-gray-500">{b.car?.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div>
                        <div>{new Date(b.startDate).toLocaleDateString()}</div>
                        <div className="text-gray-500">to {new Date(b.endDate).toLocaleDateString()}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">₹{b.totalPrice}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        b.status === "confirmed" ? "bg-green-100 text-green-800" : 
                        b.status === "pending" ? "bg-yellow-100 text-yellow-800" : 
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {b.status === "pending" && (
                          <button 
                            onClick={() => setStatus(b._id, "confirmed")} 
                            className="text-green-600 hover:text-green-800 text-sm font-medium"
                          >
                            Confirm
                          </button>
                        )}
                        {b.status === "confirmed" && (
                          <button 
                            onClick={() => setStatus(b._id, "completed")} 
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Complete
                          </button>
                        )}
                        <button 
                          onClick={() => setStatus(b._id, "cancelled")} 
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    <img src={assets.manage_bookings_icon} className="w-12 h-12 mx-auto mb-4 opacity-50" alt="No bookings" />
                    <p>No bookings found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}


