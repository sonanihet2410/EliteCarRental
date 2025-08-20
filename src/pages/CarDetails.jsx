// src/pages/CarDetails.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { carsData } from "../data/carsData";
import { assets } from "../assets/assets";

const CarDetails = () => {
  const { id } = useParams();
  const car = carsData.find((c) => c.id === parseInt(id));

  if (!car) {
    return <div className="p-6 text-red-500">Car not found.</div>;
  }

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
            src={car.image}
            alt={car.name}
            className="w-full rounded-lg shadow mb-6"
          />
          <h2 className="text-3xl font-bold mb-2">{car.name}</h2>
          <p className="text-gray-500 mb-4">
            {car.type} • {car.year}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <img src={assets.seat_icon} className="w-5 h-5" alt="" />{" "}
              {car.seats} Seats
            </div>
            <div className="flex items-center gap-2">
              <img src={assets.fuel_icon} className="w-5 h-5" alt="" />{" "}
              {car.fuel}
            </div>
            <div className="flex items-center gap-2">
              <img src={assets.transmission_icon} className="w-5 h-5" alt="" />{" "}
              {car.transmission}
            </div>
            <div className="flex items-center gap-2">
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

        {/* Right: Booking card */}
        <div className="bg-white shadow rounded-lg p-6 h-fit">
          <p className="text-2xl font-bold">₹{car.pricePerDay}</p>
          <p className="text-gray-500 mb-4">per day</p>

          <label className="block mb-2 text-sm font-medium">Pickup Date</label>
          <input
            type="date"
            className="w-full border rounded px-3 py-2 mb-4"
          />

          <label className="block mb-2 text-sm font-medium">Return Date</label>
          <input
            type="date"
            className="w-full border rounded px-3 py-2 mb-4"
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Book Now
          </button>

          <p className="text-center text-gray-400 text-sm mt-2">
            No credit card required to reserve
          </p>
        </div>
      </div>
    </section>
  );
};

export default CarDetails;
