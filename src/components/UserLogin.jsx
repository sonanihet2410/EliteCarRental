import React, { useState } from "react";

const UserLogin = ({ onClose, onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login Data:", { email, password });
    // Later: send API request to backend
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-8 w-[400px]">
        <h2 className="text-2xl font-semibold text-center mb-6">
          <span className="text-blue-600">User</span> Login
        </h2>

        <form onSubmit={handleLogin}>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            placeholder="type here"
            className="w-full border rounded-lg px-4 py-2 mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="block mb-2">Password</label>
          <input
            type="password"
            placeholder="type here"
            className="w-full border rounded-lg px-4 py-2 mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <p className="text-sm mb-4">
            Create an account?{" "}
            <button
              type="button"
              className="text-blue-600"
              onClick={onSwitch}
            >
              click here
            </button>
          </p>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
