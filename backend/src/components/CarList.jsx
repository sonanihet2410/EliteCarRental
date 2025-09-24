// src/components/CarList.jsx
import React from "react";
import CarCard from "./CarCard";
import { carsData } from "../data/carsData";

const CarList = () => {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 p-6">
      {carsData.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CarList;
