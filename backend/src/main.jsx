import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CarProvider } from "./context/CarContext.jsx"; // 👈 import CarProvider
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CarProvider>   {/* 👈 wrap App with CarProvider */}
          <App />
        </CarProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
