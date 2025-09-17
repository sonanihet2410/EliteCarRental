// controllers/authController.js (signup portion)
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("⚠️ signup blocked - email exists:", email);
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // === DEBUG LOG ===
    console.log("👉 New user saved in DB (from authController):", newUser);
    // ==================

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role || "user",
      },
    });
  } catch (err) {
    console.error("❌ Signup error:", err);
    if (err.code === 11000) {
      return res.status(400).json({ message: "Duplicate key error" });
    }
    return res.status(500).json({ message: "Server error" });
  }
};
