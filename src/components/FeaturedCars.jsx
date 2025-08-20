import React from "react";
import CarCard from "./CarCard";
import { featuredCars } from "../data/featuredCars";
import { Link } from "react-router-dom";

const FeaturedCars = () => {
  return (
    <section className="pt-12 pb-6 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Featured Vehicles</h2>
          <p className="text-gray-500 mt-2">
            Explore our selection of premium vehicles available for your next adventure.
          </p>
        </div>

        {/* Cars Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {featuredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        {/* Explore All Cars Button */}
        <div className="text-center mt-8">
          <Link
            to="/cars"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
          >
            Explore All Cars
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
