import React, { useState } from "react";
import { apiFetch } from "../lib/api";
import DashboardLayout from "../components/DashboardLayout";
import { assets } from "../assets/assets";

export default function AddCar() {
  const [form, setForm] = useState({ 
    name: "", 
    type: "", 
    year: "0", 
    image: "", 
    pricePerDay: "0", 
    seats: "0", 
    fuel: "", 
    transmission: "", 
    location: "", 
    description: "",
    availableFrom: "",
    availableTo: "" 
  });
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setMessage('Please select a valid image file');
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setMessage('File size must be less than 5MB');
        return;
      }
      
      setSelectedFile(file);
      setMessage(''); // Clear any previous messages
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
  };

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const formData = new FormData();
      
      // Add form fields
      formData.append('name', form.name);
      formData.append('type', form.type);
      formData.append('year', form.year ? Number(form.year) : 0);
      formData.append('pricePerDay', Number(form.pricePerDay));
      formData.append('seats', form.seats ? Number(form.seats) : 0);
      formData.append('fuel', form.fuel);
      formData.append('transmission', form.transmission);
      formData.append('location', form.location);
      formData.append('description', form.description);
      if (form.availableFrom) formData.append('availableFrom', new Date(form.availableFrom).toISOString());
      if (form.availableTo) formData.append('availableTo', new Date(form.availableTo).toISOString());
      
      // Add image file if selected
      if (selectedFile) {
        formData.append('image', selectedFile);
      }
      
      const response = await fetch('/api/cars', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        let errorMessage = 'Failed to add car';
        try {
          const errorData = await response.json();
          errorMessage = errorData?.message || errorMessage;
        } catch (_) {
          // non-JSON error (e.g., 404 HTML). Keep default message.
        }
        throw new Error(errorMessage);
      }
      
      setMessage("Car listed successfully");
      setForm({ 
        name: "", 
        type: "", 
        year: "0", 
        pricePerDay: "0", 
        seats: "0", 
        fuel: "", 
        transmission: "", 
        location: "", 
        description: "",
        availableFrom: "",
        availableTo: "" 
      });
      setSelectedFile(null);
      setImagePreview(null);
    } catch (e) {
      setMessage(e.message || "Failed to add car");
    }
  };

  return (
    <DashboardLayout>
      <div className="py-2">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Add New Car</h1>
          <p className="text-sm text-gray-600">Fill in details to list a new car for booking, including pricing, availability, and car specifications.</p>
        </div>

        <form onSubmit={submit} className="max-w-4xl">
          {/* Image Upload Section */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Car Image</label>
            {imagePreview ? (
              <div className="relative">
                <img 
                  src={imagePreview} 
                  alt="Car preview" 
                  className="w-full h-48 object-cover rounded-lg border border-gray-300"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
                <p className="text-sm text-gray-500 mt-2">Click the × to remove image</p>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <img src={assets.upload_icon} className="w-12 h-12 mx-auto mb-4 text-gray-400" alt="Upload" />
                <p className="text-gray-600 mb-2">Upload a picture of your car</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="car-image-upload"
                />
                <label
                  htmlFor="car-image-upload"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                >
                  Choose File
                </label>
                <p className="text-xs text-gray-500 mt-2">Supports: JPG, PNG, GIF (Max 5MB)</p>
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <FormField 
              name="name" 
              label="Brand" 
              value={form.name} 
              onChange={update}
              placeholder="e.g. BMW, Mercedes, Audi..."
            />
            <FormField 
              name="type" 
              label="Model" 
              value={form.type} 
              onChange={update}
              placeholder="e.g. X5, E-Class, M4..."
            />
            <FormField 
              name="year" 
              label="Year" 
              value={form.year} 
              onChange={update}
              type="number"
            />
            <FormField 
              name="pricePerDay" 
              label="Daily Price (₹)" 
              value={form.pricePerDay} 
              onChange={update}
              type="number"
            />
            <SelectField 
              name="type" 
              label="Category" 
              value={form.type} 
              onChange={update}
              placeholder="Select a category"
              options={["SUV", "Sedan", "Hatchback", "Coupe", "Convertible", "Truck"]}
            />
            <SelectField 
              name="transmission" 
              label="Transmission" 
              value={form.transmission} 
              onChange={update}
              placeholder="Select a transmission"
              options={["Manual", "Automatic", "CVT"]}
            />
            <SelectField 
              name="fuel" 
              label="Fuel Type" 
              value={form.fuel} 
              onChange={update}
              placeholder="Select a fuel type"
              options={["Petrol", "Diesel", "Electric", "Hybrid"]}
            />
            <FormField 
              name="seats" 
              label="Seating Capacity" 
              value={form.seats} 
              onChange={update}
              type="number"
            />
            <SelectField 
              name="location" 
              label="Location" 
              value={form.location} 
              onChange={update}
              placeholder="Select a location"
              options={["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Surat"]}
              className="md:col-span-2"
            />
            <FormField 
              name="availableFrom" 
              label="Available From" 
              value={form.availableFrom} 
              onChange={update}
              type="date"
            />
            <FormField 
              name="availableTo" 
              label="Available To" 
              value={form.availableTo} 
              onChange={update}
              type="date"
            />
          </div>

          {/* Description */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea 
              name="description" 
              value={form.description} 
              onChange={update} 
              className="w-full border border-gray-300 rounded-lg p-3 h-32 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. A luxurious SUV with a spacious interior and a powerful engine."
            />
        </div>

          {/* Submit Button */}
          <div className="flex items-center gap-4">
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <img src={assets.check_icon} className="w-5 h-5" alt="Check" />
              List Your Car
            </button>
            {message && (
              <span className={`text-sm ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
                {message}
              </span>
            )}
        </div>
      </form>
      </div>
    </DashboardLayout>
  );
}

function FormField({ label, className = "", type = "text", ...rest }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input 
        type={type}
        {...rest} 
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
      />
    </div>
  );
}

function SelectField({ label, className = "", options = [], ...rest }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <select 
        {...rest} 
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">{rest.placeholder}</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}


