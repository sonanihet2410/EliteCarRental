import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();

    // Auto-generate JWT on signup
    const token = jwt.sign(
      { id: user._id, role: user.role || "user" },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role || "user" },
    });
  } catch (err) {
    console.error("❌ Signup error:", err.message);
    return res.status(500).json({ message: err.message || "Server error" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role || "user" },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role || "user" },
    });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    return res.status(500).json({ message: err.message || "Server error" });
  }
});

// POST /api/auth/create-test-user (for development only)
router.post("/create-test-user", async (req, res) => {
  try {
    // Check if test user already exists
    const existing = await User.findOne({ email: "admin@elitecarrental.com" });
    if (existing) {
      return res.json({ message: "Test user already exists", user: existing });
    }

    const hashed = await bcrypt.hash("admin123", 10);
    const user = new User({ 
      name: "Admin User", 
      email: "admin@elitecarrental.com", 
      password: hashed,
      role: "admin"
    });
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      message: "Test user created successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("❌ Test user creation error:", err.message);
    return res.status(500).json({ message: err.message || "Server error" });
  }
});

export default router;
