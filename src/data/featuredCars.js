// src/data/featuredCars.js
import { assets } from "../assets/assets";

export const featuredCars = [
  {
    id: 1,
    name: "BMW M5CS",
    type: "Sedan",
    year: 2022,
    seats: 4,
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Ahmedabad",
    pricePerDay: 10500,
    image: assets.m5cs,
  },
  {
    id: 2,
    name: "Mercedes AMG GT",
    type: "Coupe",
    year: 2021,
    seats: 2,
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Surat",
    pricePerDay: 10000,
    image: assets.amg_gt,
  },
  {
    id: 3,
    name: "Porsche 911",
    type: "Coupe",
    year: 2023,
    seats: 2,
    fuel: "Petrol",
    transmission: "Manual",
    location: "Delhi",
    pricePerDay: 9000,
    image: assets.porsche_911,
  },
];
