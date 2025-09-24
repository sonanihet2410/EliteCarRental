// src/components/SearchForm.jsx
import React, { useState } from "react";

const SearchForm = () => {
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search values:", { location, pickupDate, returnDate });
    // Later: Add filtering logic
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white p-6 rounded-lg shadow-md flex flex-wrap gap-4 items-end"
    >
      {/* Location Dropdown */}
      <div className="flex-1 min-w-[150px]">
        <label className="block mb-1 font-medium text-gray-700">Location</label>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select City</option>
          <option value="Surat">Surat</option>
          <option value="Ahmedabad">Ahmedabad</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bangalore">Bangalore</option>
        </select>
      </div>

      {/* Pickup Date */}
      <div className="flex-1 min-w-[150px]">
        <label className="block mb-1 font-medium text-gray-700">Pickup Date</label>
        <input
          type="date"
          value={pickupDate}
          onChange={(e) => setPickupDate(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Return Date */}
      <div className="flex-1 min-w-[150px]">
        <label className="block mb-1 font-medium text-gray-700">Return Date</label>
        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Search Button */}
      <div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
