import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import axios from "axios"; // To make API requests
import assets from "../../assets/assets"; // Ensure assets path is correct

function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
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
        const response = await axios.post(
          "http://localhost:8080/auth/login",
          null,
          {
            params: { email: formData.email, password: formData.password },
          },
          { withCredentials: true }
        ); // Ensure session cookies are stored

        console.log("Login Response:", response.data);
        if (response.data.status === "success") {
          // Store role in sessionStorage (for client-side access)
          sessionStorage.setItem("role", response.data.role);
          sessionStorage.setItem("email", formData.email);

          // // Redirect user based on role
          // if (response.data.role === "ADMIN") navigate("/admin/home");
          // else if (response.data.role === "DOCTOR") navigate("/doctor/dashboard");
          // else navigate("/patient/dashboard");

          alert("Welcome " + response.data.role);

          window.location.href = "/";
        } else {
          setError(response.data.message);
        }
      } else {
        // **Signup Logic**
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match!");
          return;
        }

        const response = await axios.post(
          "http://localhost:8080/auth/register",
          {
            name: formData.fullName,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          }
        );

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
    <div className="flex flex-col w-full h-[93vh] mb-40 xl:flex-row">
    {/* Left Section (Hidden on small screens) */}
    <div className="relative flex-col justify-center hidden w-1/2 text-left text-white pl-60 xl:flex gradient-2">
      <i className="bx bx-health text-8xl mb-10 pr-[30rem]"></i>
      <h1 className="font-medium text-7xl">
        Hello from <br /> CareConnect ! 👋
      </h1>
      <p className="max-w-md mt-8 text-xl ">
        Skip repetitive and manual tasks. Get highly productive through
        automation and save tons of time!
      </p>
    </div>

    {/* Right Section (Form) */}
    <div className="flex flex-col items-center justify-center w-full p-8 xl:w-1/2">
      <div className="w-full max-w-md">
        <h2 className="text-6xl font-medium text-primary">CareConnect</h2>
        <h3 className="mt-6 mb-10 text-4xl font-light">Welcome Back!</h3>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 text-xl border-b outline-none bg-light focus:bg-gray-200"
              placeholder="Email Address"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
              maxLength={14}
              className="w-full p-3 text-xl border-b outline-none bg-light focus:bg-gray-200"
              placeholder="Password"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full p-3 mb-4 text-2xl text-white transition-all duration-300 rounded-lg cursor-pointer bg-primary hover:bg-secondary"
          >
            Login Now
          </button>
        </form>

        <p className="mt-3 text-xl text-gray-600">
          Forgot password?{" "}
          <span className="cursor-pointer text-primary">Click here</span>
        </p>
      </div>
    </div>
  </div>
  );
}

export default SignUp;
