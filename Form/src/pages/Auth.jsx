import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Example validation
    if (name.trim() === "" || password.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill in all fields!",
      });
      return;
    }

    // Save user name to localStorage
    localStorage.setItem("userName", name);

    // Show success popup
    Swal.fire({
      icon: "success",
      title: "Welcome!",
      text: `Successfully logged in as ${name}`,
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      // Redirect to welcome page after popup closes
      navigate("/welcome");
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-green-700">
          Login
        </h2>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Auth;
