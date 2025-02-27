import React, { useState } from "react";
import assets from "../../assets/assets";

function SignUp() {
  const [isSignIn, setIsSignIn] = useState(false);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <>
      <div className="flex flex-col w-full h-screen mb-1 md:flex-row gradient-4">
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

            <form action="" className="space-y-4">
              {!isSignIn && (
                <div>
                  <label className="font-medium text-gray-600">Full Name</label>
                  <input
                    type="text"
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
                  required
                  className="w-full p-2 mt-1 border rounded"
                  placeholder="email@example.com"
                />
              </div>

              {!isSignIn && (
                <div className="mb-4">
                  <label className="block text-gray-700">Select Role</label>
                  <select
                    required
                    className="w-full p-2 border rounded"
                  >
                    <option value="" disabled selected>Select Role</option>
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
                    required
                    minLength={8}
                    maxLength={14}
                    className="w-full p-2 mt-1 border rounded"
                    placeholder="••••••••"
                  />
                </div>
              )}

              <button className="w-full p-2 text-white transition-all duration-300 rounded bg-secondary hover:bg-primary">
                {isSignIn ? "Sign In" : "Sign Up"}
              </button>
              <p
                className="text-sm text-center text-red-500 cursor-pointer"
                onClick={toggleForm}
              >
                {isSignIn
                  ? "Don't have an account? Sign Up"
                  : "I have an Account? Sign In"}
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
