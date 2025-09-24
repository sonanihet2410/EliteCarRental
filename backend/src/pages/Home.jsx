// src/pages/Home.jsx
import React from "react";
import Hero from "../components/Hero";
import FeaturedCars from "../components/FeaturedCars";
import Reviews from "../components/Reviews";

const Home = () => {
  return (
    <div>
      {/* Page Heading */}
      <h2 className="text-center mt-10 text-2xl md:text-3xl font-bold text-gray-800">
        Luxury Cars on Rent
      </h2>

      <br />
      <Hero />
      <section className="py-12 px-6 md:px-16 lg:px-24">
        <FeaturedCars />
      </section>
      <Reviews />
    </div>
  );
};

export default Home;
