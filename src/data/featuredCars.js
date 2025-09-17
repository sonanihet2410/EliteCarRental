// src/data/featuredCars.js
import { assets } from "../assets/assets";

export const featuredCars = [
  {
    id: 1,
    name: "Mercedes G-Wagon G63",
    type: "SUV",
    year: 2021,
    seats: 5,
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Bangalore",
    pricePerDay: 70000,
    image: assets.gwagon_g63,
  },
  {
    id: 2,
    name: "Lamborghini Urus",
    type: "SUV",
    year: 2022,
    seats: 5,
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Mumbai",
    pricePerDay: 80000,
    image: assets.lambo_urus,
  },
  {
    id: 3,
    name: "Range Rover",
    type: "SUV",
    year: 2022,
    seats: 7,
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Ahmedabad",
    pricePerDay: 50000,
    image: assets.range_rover,
  },
];
