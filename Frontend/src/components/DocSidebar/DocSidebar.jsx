import axios from "axios";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function DocSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const logout = async () => {
    console.log("Logout called");
    try {
      await axios.post(
        "http://localhost:8080/auth/logout",
        {},
        { withCredentials: true }
      );
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("role");
      console.log("Logout called1");
      window.location.href = "/signup";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <div
        className={`h-screen bg-light p-4 flex flex-col transition-all duration-300 ${
          collapsed ? "w-16" : "w-64"
        } border-r border-gray-300`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between">
          <div
            className={`flex items-center gap-3 ${
              collapsed ? "hidden" : "block"
            }`}
          >
            {/* <RiBarChartLine className="text-2xl text-gray-700" /> */}
            <span className="text-xl font-semibold text-gray-800">
              Hello Doctor
            </span>
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-600 focus:outline-none"
          >
            {/* <RiMenuLine className="text-2xl" /> */}
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col mt-6 space-y-3">
          <NavLink
            to="/doctor-profile"
            className="flex items-center gap-3 p-2 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <i className="text-2xl ri-user-3-line"></i>
            {!collapsed && <span>Doctor Profile</span>}
          </NavLink>

          <NavLink
            to="/doctor-appoint"
            className="flex items-center gap-3 p-2 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <i className="text-2xl ri-booklet-line"></i>
            {!collapsed && <span>All Appointments</span>}
          </NavLink>

          <button
          onClick={logout}
            className="flex items-center gap-3 p-2 mt-auto text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <i className="text-2xl ri-logout-box-r-line"></i>
            {!collapsed && <span>Logout</span>}
          </button>
        </nav>
      </div>
    </>
  );
}

export default DocSidebar;
