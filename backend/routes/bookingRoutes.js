// backend/routes/bookingRoutes.js
import express from "express";
import { createBooking, getUserBookings, getAllBookings } from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";
import Booking from "../models/Booking.js";

const router = express.Router();

router.post("/", protect, createBooking);        // create booking
router.get("/me", protect, getUserBookings);     // get user's bookings
router.get("/", protect, getAllBookings);        // for admin (you could add admin check)

// PATCH /api/bookings/:id/status -> update booking status
router.patch("/:id/status", protect, async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: "status is required" });
    const allowed = ["pending", "confirmed", "cancelled", "completed"];
    if (!allowed.includes(status)) return res.status(400).json({ message: "Invalid status" });
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("car user");
    if (!updated) return res.status(404).json({ message: "Booking not found" });
    return res.json({ message: "Status updated", booking: updated });
  } catch (err) {
    return res.status(400).json({ message: err.message || "Update failed" });
  }
});

export default router;
