// src/components/CarCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const CarCard = ({ car }) => {
  return (
    <Link to={`/car/${car._id}`} className="block">
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
        {/* Image */}
        <div className="relative">
          <img
            src={car.image?.startsWith('/uploads/') ? `http://localhost:5000${car.image}` : car.image}
            alt={car.name}
            className="w-full h-48 object-cover"
          />
          {/* Available Now */}
          <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs px-3 py-1 rounded-full shadow">
            Available Now
          </span>
          {/* Price */}
          <span className="absolute bottom-3 right-3 bg-black text-white text-sm px-3 py-1 rounded">
            ₹{car.pricePerDay} / day
          </span>
        </div>

        {/* Car Info */}
        <div className="p-4">
          <h3 className="text-lg font-semibold">{car.name}</h3>
          <p className="text-gray-500">{car.type} • {car.year}</p>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-2 mt-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <img src={assets.seat_icon} alt="Seats" className="w-4 h-4" />
              {car.seats} Seats
            </div>
            <div className="flex items-center gap-2">
              <img src={assets.fuel_icon} alt="Fuel" className="w-4 h-4" />
              {car.fuel}
            </div>
            <div className="flex items-center gap-2">
              <img src={assets.transmission_icon} alt="Transmission" className="w-4 h-4" />
              {car.transmission}
            </div>
            <div className="flex items-center gap-2">
              <img src={assets.location_icon} alt="Location" className="w-4 h-4" />
              {car.location}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
