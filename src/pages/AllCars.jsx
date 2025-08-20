// src/pages/AllCars.jsx
import React, { useState } from "react";
import CarCard from "../components/CarCard";
import { carsData } from "../data/carsData"; // <-- use all cars here
import { assets } from "../assets/assets";
import { FiFilter } from "react-icons/fi";

const AllCars = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Real-time filter based on searchTerm
  const filteredCars = carsData.filter((car) =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(car.year).includes(searchTerm) ||
    (car.features &&
      car.features.some((feature) =>
        feature.toLowerCase().includes(searchTerm.toLowerCase())
      ))
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header band */}
      <section className="bg-[#EEF3F8]">
        <div className="container mx-auto px-6 lg:px-12 py-14">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center tracking-tight">
            Available Cars
          </h1>
          <p className="text-center text-gray-600 mt-4 max-w-3xl mx-auto">
            Browse our selection of premium vehicles available for your next adventure
          </p>

          {/* Centered pill search with icons */}
          <div className="mt-8 flex justify-center">
            <div className="relative w-full max-w-3xl">
              {/* left search icon */}
              <img
                src={assets.search_icon}
                alt="search"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-70"
              />
              {/* input */}
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by make, model, year, or features"
                className="w-full h-14 pl-12 pr-12 rounded-full bg-white border border-gray-200 shadow-sm outline-none focus:ring-2 focus:ring-blue-400"
              />
              {/* right filter icon (just decorative now) */}
              <span className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full text-gray-500">
                <FiFilter className="w-5 h-5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Count + Grid */}
      <section className="container mx-auto px-6 lg:px-12 py-10">
        {/* Showing X Cars */}
        <div className="mb-4">
          <p className="text-lg text-gray-600 ">
               Showing <span className="font-medium text-gray-800">{filteredCars.length}</span> Cars
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AllCars;
