// backend/models/Car.js
import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String },
    year: { type: Number },
    image: { type: String }, // URL for now
    pricePerDay: { type: Number, required: true },
    seats: { type: Number },
    fuel: { type: String },
    transmission: { type: String },
    location: { type: String },
    description: { type: String },
    availableFrom: { type: Date },
    availableTo: { type: Date },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional
  },
  { timestamps: true }
);

export default mongoose.model("Car", carSchema);
