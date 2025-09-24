// src/pages/BookingPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { apiFetch } from "../lib/api";
import { assets } from "../assets/assets";

export default function BookingPage() {
  const { id: carId } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [carLoading, setCarLoading] = useState(true);

  useEffect(() => {
    if (!carId) return;
    const loadCar = async () => {
      try {
        setCarLoading(true);
        const data = await apiFetch(`/api/cars/${carId}`);
        setCar(data);
      } catch (err) {
        console.error("Fetch car error", err);
        setMessage("Failed to load car details");
      } finally {
        setCarLoading(false);
      }
    };
    loadCar();
  }, [carId]);

  useEffect(() => {
    if (!startDate || !endDate || !car) {
      setDays(0);
      setTotal(0);
      return;
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    const msPerDay = 1000 * 60 * 60 * 24;
    const diff = Math.ceil((end - start) / msPerDay) || 1;
    const computedDays = diff >= 1 ? diff : 1;
    setDays(computedDays);
    const pricePerDay = car.pricePerDay || 0;
    setTotal(pricePerDay * computedDays);
  }, [startDate, endDate, car]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Please login to book a car.");
      return;
    }
    if (!startDate || !endDate) {
      setMessage("Please select start and end dates.");
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      setMessage("Start date must be before end date.");
      return;
    }

    try {
      setLoading(true);
      const body = {
        carId,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString()
      };
      
      console.log("🚀 Attempting to book car:", {
        carId,
        startDate: body.startDate,
        endDate: body.endDate,
        token: localStorage.getItem("token") ? "Present" : "Missing"
      });
      
      const result = await apiFetch(`/api/bookings`, { method: "POST", body, auth: true });
      console.log("✅ Booking successful:", result);
      setMessage("Booking created successfully!");
      setTimeout(() => navigate("/my-bookings"), 2000);
    } catch (err) {
      console.error("❌ Booking failed:", err);
      const msg = err?.message || "Booking failed";
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  if (carLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading car details...</p>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Car Not Found</h2>
          <p className="text-gray-600 mb-4">The car you're looking for doesn't exist.</p>
          <Link to="/cars" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Browse Cars
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/cars" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Cars
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Car Details */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative">
              <img
                src={car.image?.startsWith('/uploads/') ? `http://localhost:5000${car.image}` : car.image}
                alt={car.name}
                className="w-full h-80 object-cover"
              />
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Available
              </div>
            </div>
            
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{car.name}</h1>
              <p className="text-gray-600 mb-4">{car.type} • {car.year}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
                  <img src={assets.seat_icon} className="w-5 h-5" alt="Seats" />
                  <span className="text-sm font-medium">{car.seats} Seats</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
                  <img src={assets.fuel_icon} className="w-5 h-5" alt="Fuel" />
                  <span className="text-sm font-medium">{car.fuel}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
                  <img src={assets.transmission_icon} className="w-5 h-5" alt="Transmission" />
                  <span className="text-sm font-medium">{car.transmission}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
                  <img src={assets.location_icon} className="w-5 h-5" alt="Location" />
                  <span className="text-sm font-medium">{car.location}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700">{car.description}</p>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Book This Car</h2>
            {car.availableFrom || car.availableTo ? (
              <div className="mb-4 text-sm text-gray-600">
                Availability: {car.availableFrom ? new Date(car.availableFrom).toLocaleDateString() : 'Now'} – {car.availableTo ? new Date(car.availableTo).toLocaleDateString() : 'Open'}
              </div>
            ) : null}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={(car.availableFrom ? new Date(car.availableFrom) : new Date()).toISOString().split('T')[0]}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Return Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={(startDate ? new Date(startDate) : (car.availableFrom ? new Date(car.availableFrom) : new Date())).toISOString().split('T')[0]}
                  max={car.availableTo ? new Date(car.availableTo).toISOString().split('T')[0] : undefined}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Price Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Daily Rate</span>
                  <span className="font-semibold">₹{car.pricePerDay}/day</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold">{days} {days === 1 ? 'day' : 'days'}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-blue-600">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !startDate || !endDate}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing...
                  </div>
                ) : (
                  'Book Now'
                )}
              </button>

              {message && (
                <div className={`p-4 rounded-lg text-sm ${
                  message.includes('successfully') 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {message}
                </div>
              )}

              <p className="text-center text-gray-500 text-sm">
                No credit card required to reserve
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
