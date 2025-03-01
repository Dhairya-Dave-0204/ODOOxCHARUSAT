import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Sending mail");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        null,
        {
          params: { email: formData.email, password: formData.password },
        },
        { withCredentials: true }
      );

      if (response.data.status === "success") {
        sessionStorage.setItem("role", response.data.role);
        sessionStorage.setItem("email", formData.email);
        alert("Welcome " + response.data.role);
        if(response.data.role === "ADMIN"){
          // navigate("/admin/home");
          window.location.href = "/admin/home";
        }
        else{
        window.location.href = "/";
        }
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      alert("Please enter your email");
      return;
    }

    setLoading(true); // ✅ Start loading animation
    setLoadingText("Sending mail");

    let dotCount = 0;
    const interval = setInterval(() => {
      dotCount = (dotCount + 1) % 4; // Cycles through 0, 1, 2, 3
      setLoadingText(`Sending mail${".".repeat(dotCount)}`); // Changes text dynamically
    }, 500); // Update every 500ms

    try {
      const response = await axios.post("http://localhost:8080/auth/forgot-password", { email: forgotEmail });

      clearInterval(interval); // ✅ Stop animation
      setLoading(false);
      alert(response.data.message || "Check your email for reset instructions.");
      setShowForgotPassword(false);
    } catch (error) {
      clearInterval(interval); // ✅ Stop animation on error
      setLoading(false);
      alert("Error sending email. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col w-full h-[92vh] xl:flex-row">
      {/* Left Side */}
      <div className="relative flex-col justify-center hidden w-1/2 text-left text-white pl-60 xl:flex gradient-2">
        <h1 className="font-medium text-7xl">Hello from CareConnect! 👋</h1>
        <p className="max-w-md mt-8 text-xl">
          Skip repetitive and manual tasks. Get highly productive through automation and save tons of time!
        </p>
      </div>

      {/* Right Side (Login Form) */}
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
                className="w-full p-3 text-xl border-b outline-none bg-light"
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
                className="w-full p-3 text-xl border-b outline-none bg-light"
                placeholder="Password"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button type="submit" className="w-full p-3 text-2xl text-white rounded-lg bg-primary hover:bg-secondary">
              Login Now
            </button>
          </form>

          <p className="mt-3 text-xl text-gray-600">
            Forgot password?{" "}
            <span onClick={() => setShowForgotPassword(true)} className="cursor-pointer text-primary">
              Click here
            </span>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="p-6 bg-white rounded-lg w-96">
            <h2 className="mb-4 text-2xl font-medium">Reset Password</h2>
            
            <input
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              className="w-full p-3 mb-4 text-xl border-b outline-none bg-light"
              placeholder="Enter your email"
            />

            <button
              onClick={handleForgotPassword}
              disabled={loading}
              className="w-full p-3 text-white rounded-lg bg-primary hover:bg-secondary"
            >
              {loading ? loadingText : "Send Mail"} {/* ✅ Shows animated dots while loading */}
            </button>

            <button onClick={() => setShowForgotPassword(false)} className="w-full p-3 mt-2 bg-gray-300 rounded-lg">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUp;
