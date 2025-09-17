// backend/routes/carRoutes.js
import express from "express";
import Car from "../models/Car.js";
import Booking from "../models/Booking.js";
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
router.post("/", protect, (req, res, next) => {
  req.upload.single('image')(req, res, next);
}, async (req, res) => {
  try {
    const {
      name, type, year, pricePerDay,
      seats, fuel, transmission, location, description,
      availableFrom, availableTo
    } = req.body;

    if (!name || !pricePerDay) {
      return res.status(400).json({ message: "name and pricePerDay are required" });
    }

    // Handle image upload
    let imageUrl = '';
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    } else if (req.body.image) {
      // Fallback for base64 images (for backward compatibility)
      imageUrl = req.body.image;
    }

    const car = new Car({
      name, type, year, image: imageUrl, pricePerDay,
      seats, fuel, transmission, location, description,
      availableFrom: availableFrom ? new Date(availableFrom) : undefined,
      availableTo: availableTo ? new Date(availableTo) : undefined,
      owner: req.user ? req.user._id : undefined
    });

    const saved = await car.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/cars/:id -> public car details
router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (err) {
    return res.status(400).json({ message: "Invalid car id" });
  }
});

// PUT /api/cars/:id -> protected, update car
router.put("/:id", protect, async (req, res) => {
  try {
    const updates = req.body;
    const car = await Car.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (err) {
    res.status(400).json({ message: err.message || "Update failed" });
  }
});

// DELETE /api/cars/:id -> protected, delete car
router.delete("/:id", protect, async (req, res) => {
  try {
    const carId = req.params.id;
    const car = await Car.findByIdAndDelete(carId);
    if (!car) return res.status(404).json({ message: "Car not found" });
    // Cascade delete related bookings so dashboards reflect correctly
    await Booking.deleteMany({ car: carId });
    res.json({ message: "Car and related bookings deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message || "Delete failed" });
  }
});

export default router;
