import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/reset-password", { token, newPassword });
      setMessage(response.data);
      console.log(response.data);
      if (response.data === "Invalid token!") {
        setMessage("Link Expired. Please try again.");
        return;
      }
   
      navigate("/signup");
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage("Error resetting password.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="mb-4 text-2xl font-semibold">Reset Password</h2>
      <form onSubmit={handleResetPassword} className="flex flex-col gap-4 w-80">
        <input
          type="password"
          placeholder="Enter new password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="p-3 border rounded-lg"
        />
        <button type="submit" className="px-6 py-2 text-white bg-green-600 rounded-lg">
          Reset Password
        </button>
      </form>
      {message && <p className="mt-4 text-gray-700">{message}</p>}
    </div>
  );
}

export default ResetPassword;
