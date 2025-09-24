import React, { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import DashboardLayout from "../components/DashboardLayout";
import { assets } from "../assets/assets";

export default function ManageCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      const data = await apiFetch("/api/cars");
      setCars(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    if (!confirm("Delete this car?")) return;
    await apiFetch(`/api/cars/${id}`, { method: "DELETE", auth: true });
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
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Manage Cars</h1>
          <p className="text-sm text-gray-600">View all listed cars, update their details, or remove them from the booking platform.</p>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Car</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Category</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Price</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cars.length > 0 ? (
                cars.map(c => (
                  <tr key={c._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={c.image?.startsWith('/uploads/') ? `http://localhost:5000${c.image}` : (c.image || assets.car_image1)} 
                          className="w-16 h-12 object-cover rounded-lg" 
                          alt={c.name}
                        />
                        <div>
                          <div className="font-medium text-gray-900">{c.name}</div>
                          <div className="text-sm text-gray-500">{c.seats} seats • {c.transmission}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{c.type || "-"}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">₹{c.pricePerDay}/day</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Available
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => remove(c._id)} 
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    <img src={assets.car_icon} className="w-12 h-12 mx-auto mb-4 opacity-50" alt="No cars" />
                    <p>No cars listed yet</p>
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


