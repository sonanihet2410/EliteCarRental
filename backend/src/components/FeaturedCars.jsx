import React from "react";
import CarCard from "./CarCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const FeaturedCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/cars")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch cars");
        return res.json();
      })
      .then((data) => {
        setCars(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Get top 3 cars by pricePerDay
  const topCars = cars
    .sort((a, b) => b.pricePerDay - a.pricePerDay)
    .slice(0, 3);

  if (loading) {
    return <div className="text-center py-12">Loading featured cars...</div>;
  }
  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

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
          {topCars.map((car) => (
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
