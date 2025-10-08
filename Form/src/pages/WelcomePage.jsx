import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (!name) {
      Swal.fire({
        icon: "warning",
        title: "Not Logged In",
        text: "Please login first!",
      });
      navigate("/");
    } else {
      setUserName(name);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    Swal.fire({
      icon: "info",
      title: "Logged Out",
      text: "You’ve been logged out successfully.",
      timer: 1500,
      showConfirmButton: false,
    }).then(() => navigate("/"));
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-green-50 to-green-200 text-center">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md">
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          Welcome, {userName}! 🌿
        </h1>
        <p className="text-gray-600 mb-8">
          You have successfully logged in. Enjoy exploring the app!
        </p>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
