import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLogin) {
      // ---- Signup Logic ----
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        Swal.fire({
          icon: "warning",
          title: "Missing Fields",
          text: "Please fill in all required fields!",
          confirmButtonColor: "#f59e0b",
        });
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Password Mismatch",
          text: "Passwords do not match!",
          confirmButtonColor: "#f59e0b",
        });
        return;
      }

      // save user
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      };
      localStorage.setItem("userData", JSON.stringify(userData));

      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "Your account has been successfully created.",
        confirmButtonColor: "#f59e0b",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        setIsLogin(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }, 2000);
    } else {
      // ---- Login Logic ----
      const storedUser = JSON.parse(localStorage.getItem("userData"));

      if (!storedUser) {
        Swal.fire({
          icon: "info",
          title: "No Account Found",
          text: "Please sign up before logging in!",
          confirmButtonColor: "#f59e0b",
        });
        return;
      }

      if (
        storedUser.email === formData.email &&
        storedUser.password === formData.password
      ) {
        Swal.fire({
          icon: "success",
          title: `Welcome, ${storedUser.firstName}!`,
          text: "You have successfully logged in.",
          confirmButtonColor: "#f59e0b",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid Credentials",
          text: "Incorrect email or password!",
          confirmButtonColor: "#f59e0b",
        });
      }
    }
  };

  return (
    <div className="flex items-center bg-white min-h-screen">
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col lg:flex-row rounded-xl shadow-xl overflow-hidden">
          {/* left side */}
          <div className="w-full lg:w-1/2 p-12">
            <div className="flex flex-col">
              <h3 className="text-3xl text-gray-700 mb-2 font-bold">
                {isLogin ? " Welcome Back" : "Create Account "}
              </h3>
              <p className="text-gray-600">
                {isLogin ? "Login to your account" : "Join to your Account "}
              </p>

              {/* Social buttons */}
              <div className="grid grid-cols-2 gap-6 mt-6">
                <button className="flex items-center justify-center gap-2 py-2 border border-gray-300 rounded">
                  <img className="w-4 " src="./google.png" alt="" />
                  Google
                </button>
                <button className="flex items-center justify-center gap-2 py-2 border border-gray-300 rounded">
                  <img className="w-5" src="./facebook.png" alt="" />
                  Facebook
                </button>
              </div>

              {/* line */}
              <div className="flex items-center gap-4 mt-6">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="text-gray-700"> or </span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              {/* Authentication form */}
              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                      <label className="block text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded outline-none placeholder:text-sm placeholder:text-gray-600 "
                        placeholder="Enter First Name"
                        type="text"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded outline-none placeholder:text-sm placeholder:text-gray-600 "
                        placeholder="Enter Last Name"
                        type="text"
                      />
                    </div>
                  </div>
                )}

                {/* Email */}
                <div className="mb-4 mt-6 ">
                  <label className="block text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded outline-none placeholder:text-sm placeholder:text-gray-600"
                    placeholder="Enter your email address"
                    type="text"
                  />
                </div>

                {/* password */}
                <div className="mb-4 mt-6 ">
                  <label className="block text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <input
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded outline-none placeholder:text-sm placeholder:text-gray-600"
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setShowPassword(!showPassword);
                      }}
                      className="absolute top-3 right-3 text-gray-600 hover:text-gray-700 cursor-pointer"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div className="mb-4 mt-6 ">
                    <label className="block text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded outline-none placeholder:text-sm placeholder:text-gray-600"
                        placeholder="Enter your password"
                        type={showConfirmPassword ? "text" : "password"}
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setShowConfirmPassword(!showConfirmPassword);
                        }}
                        className="absolute top-3 right-3 text-gray-600 hover:text-gray-700 cursor-pointer"
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                )}

                {isLogin && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input className="w-4 h-4" type="checkbox" />
                      <span className="text-sm text-gray-700 font-semibold ">
                        Remember Me
                      </span>
                    </div>
                    <a
                      href="# "
                      className="text-amber-600 text-sm font-semibold hover:underline"
                    >
                      Forget Password
                    </a>
                  </div>
                )}

                <div className="mt-6 mb-2">
                  <button className="w-full bg-amber-600 text-white font-bold rounded cursor-pointer py-2">
                    {isLogin ? "Login" : "Sign Up"}
                  </button>
                </div>
                <p className="text-sm text-center text-gray-600">
                  {isLogin
                    ? "Don't have an account?"
                    : "If you already have an account"}
                  <span
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-amber-600 hover:underline ml-2 cursor-pointer"
                  >
                    {isLogin ? "Sign Up" : "Login"}
                  </span>
                </p>
              </form>
            </div>
          </div>

          {/* Right side banner */}
          <div
            className="relative w-full lg:w-1/2 bg-cover bg-center flex items-center justify-center text-white rounded"
            style={{ backgroundImage: "url('./bgImage.png')" }}
          >
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="relative text-center">
              <h3 className="text-3xl font-bold">
                Login your account and explore it.
              </h3>
              <p className="max-w-sm mx-auto">
                Login your account and save orders, cart items and enjoy offers
              </p>
              <button className="mt-6 px-6 py-2 border-2 border-white rounded cursor-pointer">
                Create an Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
