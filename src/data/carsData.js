// src/data/carsData.js
import { assets } from "../assets/assets";

export const carsData = [
  {
    id: 1,
    name: "BMW M5 CS",
    type: "Sedan",
    year: 2022,
    image: assets.m5cs,
    pricePerDay: 35000,
    seats: 4,
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Ahmedabad",
    description: "A high-performance luxury sedan with exceptional comfort and speed."
  },
  {
    id: 2,
    name: "Mercedes AMG GT",
    type: "Coupe",
    year: 2021,
    image: assets.amg_gt,
    pricePerDay: 45000,
    seats: 2,
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Surat",
    description: "A luxury sports coupe delivering outstanding power and style."
  },
  {
    id: 3,
    name: "Porsche 911",
    type: "Coupe",
    year: 2023,
    image: assets.porsche_911,
    pricePerDay: 60000,
    seats: 4,
    fuel: "Delhi",
    transmission: "Manual",
    location: "New York",
    description: "An iconic sports car known for its performance and timeless design."
  },
  {
    id: 4,
    name: "Lamborghini Urus",
    type: "SUV",
    year: 2022,
    image: assets.lambo_urus,
    pricePerDay: 80000,
    seats: 5,
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Mumbai",
    description: "A luxury SUV with supercar performance and unmatched style."
  },
  {
    id: 5,
    name: "Mercedes G-Wagon G63",
    type: "SUV",
    year: 2021,
    image: assets.gwagon_g63,
    pricePerDay: 70000,
    seats: 5,
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Banglore",
    description: "A rugged yet luxurious SUV that offers both style and capability."
  },
  {
    id: 6,
    name: "Bentley Continental GT",
    type: "Coupe",
    year: 2020,
    image: assets.bentley,
    pricePerDay: 65000,
    seats: 4,
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Hydrabad",
    description: "An elegant grand tourer with refined luxury and effortless power."
  }
];
