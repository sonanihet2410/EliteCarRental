import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../lib/api";
import { assets } from "../assets/assets";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await apiFetch("/api/bookings/me", { auth: true });
        setBookings(data.bookings || []);
      } catch (e) {
        setError(e.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Bookings</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-600 mt-2">Manage your car rental bookings</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <img src={assets.car_icon} className="w-16 h-16 mx-auto mb-4 opacity-50" alt="No bookings" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bookings Yet</h3>
            <p className="text-gray-600 mb-6">You haven't made any car rental bookings yet.</p>
            <Link 
              to="/cars" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Cars
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Car Image */}
                    <div className="md:w-64 flex-shrink-0">
                      <img
                        src={booking.car?.image?.startsWith('/uploads/') 
                          ? `http://localhost:5000${booking.car.image}` 
                          : booking.car?.image || assets.car_image1}
                        alt={booking.car?.name}
                        className="w-full h-48 md:h-40 object-cover rounded-lg"
                      />
                    </div>

                    {/* Booking Details */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {booking.car?.name}
                          </h3>
                          <p className="text-gray-600 mb-2">
                            {booking.car?.type} • {booking.car?.year}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <img src={assets.seat_icon} className="w-4 h-4" alt="Seats" />
                              {booking.car?.seats} seats
                            </span>
                            <span className="flex items-center gap-1">
                              <img src={assets.fuel_icon} className="w-4 h-4" alt="Fuel" />
                              {booking.car?.fuel}
                            </span>
                            <span className="flex items-center gap-1">
                              <img src={assets.transmission_icon} className="w-4 h-4" alt="Transmission" />
                              {booking.car?.transmission}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-4 md:mt-0 text-right">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      {/* Booking Info */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Pickup Date</p>
                          <p className="font-medium">{new Date(booking.startDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Return Date</p>
                          <p className="font-medium">{new Date(booking.endDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Duration</p>
                          <p className="font-medium">{booking.days} {booking.days === 1 ? 'day' : 'days'}</p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                          <p className="text-sm text-gray-600">Total Amount</p>
                          <p className="text-2xl font-bold text-blue-600">₹{booking.totalPrice?.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Daily Rate</p>
                          <p className="font-semibold">₹{booking.car?.pricePerDay}/day</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


