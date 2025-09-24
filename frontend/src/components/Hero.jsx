// src/components/Hero.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
  const navigate = useNavigate();

  // Form State
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  // Handle Search
  const handleSearch = () => {
    if (!pickupLocation || !pickupDate || !returnDate) {
      alert("Please fill all fields");
      return;
    }
    // Redirect with query parameters
    navigate(
      `/search?location=${encodeURIComponent(pickupLocation)}&pickup=${pickupDate}&return=${returnDate}`
    );
  };

  return (
    <section className="bg-light py-12 px-6 md:px-16 lg:px-24 xl:px-32 flex flex-col md:flex-row items-center gap-8">
      {/* Left Section - Text */}
      <div className="flex-1">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
          Find Your Perfect Ride with{" "}
          <span className="text-primary">Elite Car Rentals</span>
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Browse, compare, and book the best cars at unbeatable prices.
          Whether you need a luxury SUV or a budget-friendly sedan — we’ve got you covered.
        </p>

        {/* Search Block */}
        <div className="mt-8 bg-white shadow-lg rounded-full flex flex-wrap md:flex-nowrap items-center gap-4 px-6 py-4">
          {/* Pickup Location */}
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700"> Pickup Location</label>
            <select
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full outline-none bg-transparent text-gray-500"
            >
              <option value="">Please select location</option>
              <option>Surat </option>
              <option>Ahmedabad</option>
              <option>Baroda</option>
            </select>
          </div>

          {/* Pick-up Date */}
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700">Pick-up Date</label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full outline-none bg-transparent text-gray-500"
            />
          </div>

          {/* Return Date */}
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700">Return Date</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full outline-none bg-transparent text-gray-500"
            />
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-full flex items-center gap-2"
          >
            🔍 Search
          </button>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="flex-1">
        <img
          src={assets.main_car}
          alt="Car Banner"
          className="w-full max-w-lg mx-auto"
        />
      </div>
    </section>
  );
};

export default Hero;
