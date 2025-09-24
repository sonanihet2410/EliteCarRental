// src/App.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import { CarProvider } from "./context/CarContext";

import Home from "./pages/Home";
import AllCars from "./pages/AllCars";
import CarDetails from "./pages/CarDetails";
import ListCar from "./pages/ListCar";
import BookingPage from "./pages/BookingPage";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/AdminDashboard";
import ManageCars from "./pages/ManageCars";
import ManageBookings from "./pages/ManageBookings";
import AddCar from "./pages/AddCar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/dashboard');
  
  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/manage-cars" element={<ProtectedRoute><ManageCars /></ProtectedRoute>} />
        <Route path="/dashboard/manage-bookings" element={<ProtectedRoute><ManageBookings /></ProtectedRoute>} />
        <Route path="/dashboard/add-car" element={<ProtectedRoute><AddCar /></ProtectedRoute>} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<AllCars />} />
          <Route path="/car/:id" element={<CarDetails />} />
          <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/list-car" element={
            <ProtectedRoute>
              <ListCar />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <CarProvider>
        <AppContent />
      </CarProvider>
    </AuthProvider>
  );
};

export default App;
