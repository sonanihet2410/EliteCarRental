// backend/routes/carRoutes.js
import express from "express";
import Car from "../models/Car.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/cars  -> public list
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/cars -> protected, create a new car listing
router.post("/", protect, async (req, res) => {
  try {
    const {
      name, type, year, image, pricePerDay,
      seats, fuel, transmission, location, description
    } = req.body;

    if (!name || !pricePerDay) {
      return res.status(400).json({ message: "name and pricePerDay are required" });
    }

    const car = new Car({
      name, type, year, image, pricePerDay,
      seats, fuel, transmission, location, description,
      owner: req.user ? req.user._id : undefined
    });

    const saved = await car.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
