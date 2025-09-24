import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand Section */}
        <div>
          <img src={assets.logo} alt="Elite Car Rentals" className="h-10 mb-4" />
          <p className="text-gray-400 text-sm">
            Your trusted partner for luxury and budget-friendly rides.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Search Car</Link></li>
            <li><Link to="/list-car">List Car</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Email: elite_car_rental@gmail.com</li>
            <li>Phone: +91 93137 50709</li>
            <li>Location: Surat, India</li>
          </ul>
        </div>

      {/* Social Media */}
<div>
  <h3 className="font-semibold mb-4">Follow Us</h3>
  <div className="flex space-x-4">
    <a href="#" className="hover:opacity-80 transition">
      <img src={assets.facebook_logo} alt="Facebook" className="w-6 h-6" />
    </a>
    <a href="#" className="hover:opacity-80 transition">
      <img src={assets.instagram_logo} alt="Instagram" className="w-6 h-6" />
    </a>
    <a href="#" className="hover:opacity-80 transition">
      <img src={assets.twitter_logo} alt="Twitter" className="w-6 h-6" />
    </a>
  </div>
</div>



      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Elite Car Rentals. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
