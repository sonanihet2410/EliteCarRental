// src/components/Reviews.jsx
import React from "react";
import user1 from "../assets/user_profile1.png";
import user2 from "../assets/user_profile2.png";
import user3 from "../assets/user_profile3.png";

const reviews = [
  {
    id: 1,
    name: "Rahul Mehta",
    location: "Mumbai, India",
    rating: 5,
    text: "The car was spotless, delivered on time, and the booking process was hassle-free.",
    image: user1,
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Delhi, India",
    rating: 5,
    text: "Amazing experience! Felt like royalty driving the BMW M5CS around the city.",
    image: user2,
  },
  {
    id: 3,
    name: "Ananya sharma",
    location: "Bangalore, India",
    rating: 5,
    text: "Professional service, premium cars, and the best prices I’ve seen. Highly recommended!",
    image: user3,
  },
];

const Reviews = () => {
  return (
    <section className="px-8 md:px-20 lg:px-28 xl:px-34 py-20 bg-white">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">What Our Customers Say</h2>
        <p className="text-gray-500 mt-3 text-lg">
          Real stories from real journeys — because great rides deserve great memories.
        </p>
      </div>

      {/* Reviews Grid */}
      <div className="grid gap-10 md:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition-transform transform hover:-translate-y-1"
          >
            {/* User Info */}
            <div className="flex items-center gap-5 mb-5">
              <img
                src={review.image}
                alt={review.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-lg">{review.name}</h3>
                <p className="text-sm text-gray-500">{review.location}</p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex text-yellow-500 mb-4 text-lg">
              {Array.from({ length: review.rating }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>

            {/* Review Text */}
            <p className="text-gray-600 text-base leading-relaxed">
              {review.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
