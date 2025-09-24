// src/pages/CarDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { apiFetch } from "../lib/api";
// Using dynamic data only; static demo cars removed

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState(0);
  const [total, setTotal] = useState(0);
  const [bookingMsg, setBookingMsg] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await apiFetch(`/api/cars/${id}`);
        if (mounted) setCar(data);
      } catch (e) {
        setError(e.message || "Failed to load car");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

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

  const handleBooking = async (e) => {
    e.preventDefault();
    setBookingMsg("");
    const token = localStorage.getItem("token");
    if (!token) {
      setBookingMsg("Please login to book a car.");
      return;
    }
    if (!startDate || !endDate) {
      setBookingMsg("Please select start and end dates.");
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      setBookingMsg("Start date must be before end date.");
      return;
    }
    try {
      setBookingLoading(true);
      const body = {
        carId: car._id,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
      };
      await apiFetch(`/api/bookings`, { method: "POST", body, auth: true });
      setBookingMsg("Booking created successfully!");
      setTimeout(() => navigate("/my-bookings"), 1500);
    } catch (err) {
      setBookingMsg(err?.message || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!car) return <div className="p-6 text-red-500">Car not found.</div>;

  // Example features (replace with car.features if available in data)
  const features = [
    "360 Camera",
    "GPS",
    "Rear View Mirror",
    "Bluetooth",
    "Heated Seats"
  ];

  return (
    <section className="px-6 md:px-16 lg:px-24 py-12">
      {/* Back to cars */}
      <Link to="/cars" className="text-blue-600  mb-6 block">
        ←  Back to all cars
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: Car details */}
        <div className="lg:col-span-2">
          <img
            src={car.image?.startsWith('/uploads/') ? `http://localhost:5000${car.image}` : car.image}
            alt={car.name}
            className="w-full rounded-lg shadow mb-6"
          />
          <h2 className="text-3xl font-bold mb-2">{car.name}</h2>
          <p className="text-gray-500 mb-4">
            {car.type} • {car.year}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
              <img src={assets.seat_icon} className="w-5 h-5" alt="" />{" "}
              {car.seats} Seats
            </div>
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
              <img src={assets.fuel_icon} className="w-5 h-5" alt="" />{" "}
              {car.fuel}
            </div>
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
              <img src={assets.transmission_icon} className="w-5 h-5" alt="" />{" "}
              {car.transmission}
            </div>
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
              <img src={assets.location_icon} className="w-5 h-5" alt="" />{" "}
              {car.location}
            </div>
          </div>

          {/* Description */}
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="text-gray-700 mb-6">{car.description}</p>

          {/* Features */}
          <h3 className="text-lg font-semibold mb-2">Features</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-gray-700"
              >
                <span className="text-blue-500">✔</span> {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Booking card (inline) */}
        <div className="bg-white shadow rounded-lg p-6 h-fit">
          <div className="flex items-end justify-between mb-2">
            <p className="text-2xl font-bold">₹{car.pricePerDay}</p>
            <span className="text-xs text-gray-500">per day</span>
          </div>

          <form onSubmit={handleBooking} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Pickup Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={(car.availableFrom ? new Date(car.availableFrom) : new Date()).toISOString().split('T')[0]}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Return Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={(startDate ? new Date(startDate) : (car.availableFrom ? new Date(car.availableFrom) : new Date())).toISOString().split('T')[0]}
                max={car.availableTo ? new Date(car.availableTo).toISOString().split('T')[0] : undefined}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div className="bg-gray-50 rounded p-3 text-sm">
              <div className="flex items-center justify-between">
                <span>Duration</span>
                <span className="font-medium">{days} {days === 1 ? 'day' : 'days'}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span>Total</span>
                <span className="font-semibold">₹{total.toLocaleString()}</span>
              </div>
            </div>

            <button type="submit" disabled={bookingLoading || !startDate || !endDate} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed">
              {bookingLoading ? 'Processing...' : 'Book Now'}
            </button>

            {car.availableFrom || car.availableTo ? (
              <p className="text-center text-gray-500 text-sm">
                Availability: {car.availableFrom ? new Date(car.availableFrom).toLocaleDateString() : 'Now'} – {car.availableTo ? new Date(car.availableTo).toLocaleDateString() : 'Open'}
              </p>
            ) : (
              <p className="text-center text-gray-400 text-sm">No credit card required to reserve</p>
            )}

            {bookingMsg && (
              <p className={`text-center text-sm ${bookingMsg.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>{bookingMsg}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default CarDetails;
