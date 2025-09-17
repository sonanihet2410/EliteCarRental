// backend/controllers/bookingController.js
import Booking from "../models/Booking.js";
import Car from "../models/Car.js"; // adjust import path if different

// helper to compute inclusive days
const msPerDay = 1000 * 60 * 60 * 24;
function daysBetweenInclusive(start, end) {
  // floor difference in days, then +1 if you treat both endpoints inclusive
  return Math.ceil((end - start) / msPerDay) || 1;
}

// Create new booking
export const createBooking = async (req, res) => {
  try {
    const userId = req.user && req.user._id; // protect middleware should set req.user
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { carId, startDate: startStr, endDate: endStr } = req.body;
    if (!carId || !startStr || !endStr) {
      return res.status(400).json({ message: "carId, startDate and endDate are required" });
    }

    const start = new Date(startStr);
    const end = new Date(endStr);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: "Invalid dates" });
    }
    if (start > end) return res.status(400).json({ message: "startDate must be <= endDate" });

    // fetch car to get price and availability window
    const car = await Car.findById(carId);
    if (!car) return res.status(404).json({ message: "Car not found" });

    // Check if requested dates fall within car availability window (if set)
    if (car.availableFrom && start < car.availableFrom) {
      return res.status(409).json({ message: "Car not available from the selected start date" });
    }
    if (car.availableTo && end > car.availableTo) {
      return res.status(409).json({ message: "Car not available until the selected end date" });
    }

    // Check overlapping bookings: start <= existing.end && end >= existing.start
    const overlap = await Booking.findOne({
      car: carId,
      startDate: { $lte: end },
      endDate: { $gte: start }
    });

    if (overlap) {
      return res.status(409).json({ message: "Selected dates are not available" });
    }

    const days = daysBetweenInclusive(start, end);
    const totalPrice = (car.pricePerDay || car.rentPerDay || 0) * days;

    const booking = await Booking.create({
      user: userId,
      car: carId,
      startDate: start,
      endDate: end,
      days,
      totalPrice,
      status: "pending"
    });

    console.log("✅ Booking created successfully:", {
      bookingId: booking._id,
      carId,
      userId,
      startDate: start,
      endDate: end,
      days,
      totalPrice
    });

    // Optional: populate for response
    await booking.populate([{ path: "user", select: "name email" }, { path: "car" }]);

    return res.status(201).json({ message: "Booking created", booking });
  } catch (err) {
    console.error("❌ Create booking error:", err);
    console.error("Error details:", {
      message: err.message,
      name: err.name,
      code: err.code,
      stack: err.stack
    });
    return res.status(500).json({ message: "Server error: " + err.message });
  }
};

// Get bookings for current user
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookings = await Booking.find({ user: userId }).populate("car").sort({ createdAt: -1 });
    return res.json({ count: bookings.length, bookings });
  } catch (err) {
    console.error("Get user bookings error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// (Optional) Admin: get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("car user").sort({ createdAt: -1 });
    return res.json({ count: bookings.length, bookings });
  } catch (err) {
    console.error("Get all bookings error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
