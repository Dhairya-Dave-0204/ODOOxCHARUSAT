import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import axios from "axios"; // To make API requests
import assets from "../../assets/assets"; // Ensure assets path is correct

function SignUp() {
  const [isSignIn, setIsSignIn] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate(); // Used to redirect users after login

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (Login or Signup)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      if (isSignIn) {
        // **Login Logic**
        const response = await axios.post("http://localhost:8080/auth/login",null, {
          params:{email: formData.email,
          password: formData.password},
        }, { withCredentials: true }); // Ensure session cookies are stored

        console.log("Login Response:", response.data);
        if (response.data.status === "success") {
          // Store role in sessionStorage (for client-side access)
          sessionStorage.setItem("role", response.data.role);
          sessionStorage.setItem("email", formData.email);

          // Redirect user based on role
          if (response.data.role === "ADMIN") navigate("/admin/dashboard");
          else if (response.data.role === "DOCTOR") navigate("/doctor/dashboard");
          else navigate("/patient/dashboard");
        } else {
          setError(response.data.message);
        }
      } else {
        // **Signup Logic**
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match!");
          return;
        }

        const response = await axios.post("http://localhost:8080/auth/register", {
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        });

        console.log("Signup Response:", response.data);
        if (response.data.status === "success") {
          setIsSignIn(true); // Switch to login after successful signup
        } else {
          setError(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col w-full h-screen md:flex-row gradient-4">
      {/* Left Side */}
      <div className="relative flex flex-col items-center justify-center w-full p-6 text-white md:w-1/2 md:p-12">
        <h1 className="text-2xl font-bold">CareConnect</h1>
        <div className="relative mt-6">
          <img
            src={assets.surgeon}
            alt="Doctor"
            className="rounded-[50%] w-80 md:w-[500px]"
          />
        </div>
        <p className="absolute mb-4 text-sm bottom-28 max-md:hidden">
          Copyright © 2019, CareConnect. All rights reserved
        </p>
      </div>

      {/* Right Side */}
      <div className="flex flex-col items-center justify-center w-full p-6 bg-light md:w-1/2 md:p-12">
        <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
          <div className="flex justify-between mb-4">
            <button
              className={`pb-1 font-semibold border-b-2 cursor-pointer ${
                !isSignIn ? "border-primary text-primary" : "text-gray-500"
              }`}
              onClick={() => setIsSignIn(false)}
            >
              Sign Up
            </button>
            <button
              className={`pb-1 font-semibold border-b-2 cursor-pointer ${
                isSignIn ? "border-primary text-primary" : "text-gray-500"
              }`}
              onClick={() => setIsSignIn(true)}
            >
              Sign In
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isSignIn && (
              <div>
                <label className="font-medium text-gray-600">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full p-2 mt-1 border rounded"
                  placeholder="Your Name"
                />
              </div>
            )}

            <div>
              <label className="font-medium text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 mt-1 border rounded"
                placeholder="email@example.com"
              />
            </div>

            {!isSignIn && (
              <div className="mb-4">
                <label className="block text-gray-700">Select Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                >
                  <option value="" disabled>Select Role</option>
                  <option value="PATIENT">PATIENT</option>
                  <option value="DOCTOR">DOCTOR</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
            )}

            <div>
              <label className="font-medium text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                maxLength={14}
                className="w-full p-2 mt-1 border rounded"
                placeholder="••••••••"
              />
            </div>

            {!isSignIn && (
              <div>
                <label className="font-medium text-gray-600">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={8}
                  maxLength={14}
                  className="w-full p-2 mt-1 border rounded"
                  placeholder="••••••••"
                />
              </div>
            )}

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              className="w-full p-2 text-white transition-all duration-300 rounded bg-secondary hover:bg-primary"
            >
              {isSignIn ? "Sign In" : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
