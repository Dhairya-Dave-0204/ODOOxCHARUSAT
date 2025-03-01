import React, { useState, useEffect } from "react";
import axios from "axios";
import AppointCard from "./AppointCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function UserProfile() {
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]); // Store actual appointments
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const email = sessionStorage.getItem("email");

  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      toast.error("Please Login First");
      navigate("/signup");
      setLoading(false);
      return;
    }

    const fetchPatient = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/fetch/findpatient",
          { params: { email } }
        );
        setPatient(response.data);
      } catch (error) {
        console.error("Error fetching patient:", error);
        setError("Patient not found.");
      }
    };

    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/fetch/patientappointments",
          { params: { email } }
        );
        setAppointments(response.data); // Store fetched appointments
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError("Failed to fetch appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
    fetchAppointments();
  }, [email]);

  if (loading) return <p className="text-lg text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="px-10 py-6 mt-5 mb-32 sm:px-14 md:px-20 lg:px-28 xl:px-32 2xl:px-40">
      {/* Personal Information Section */}
      <form className="flex flex-col col-span-4 gap-4">
        <div className="flex flex-col justify-between md:items-center md:flex-row">
          <h3 className="mb-1 text-3xl font-medium md:text-4xl max-md:mb-5">
            Personal Information
          </h3>
          <button className="px-6 py-2 text-xl duration-500 rounded-md text-light bg-primary hover:scale-105">
            Change Password
          </button>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-1 basis-[50%]">
            <label className="mb-2 text-xl">Full Name</label>
            <input
              type="text"
              readOnly
              value={patient?.name || ""}
              className="w-full px-3 py-1.5 border-b border-gray-400 outline-none font-light text-lg"
            />
          </div>
          <div className="flex flex-col gap-1 basis-[50%]">
            <label className="mb-2 text-xl">E-mail</label>
            <input
              type="email"
              readOnly
              value={patient?.email || ""}
              className="w-full px-3 py-1.5 border-b border-gray-400 outline-none font-light text-lg"
            />
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-1 basis-[50%]">
            <label className="mb-2 text-xl">Age</label>
            <input
              type="number"
              readOnly
              value={patient?.age || ""}
              className="w-full px-3 py-1.5 border-b border-gray-400 outline-none font-light text-lg"
            />
          </div>
          <div className="flex flex-col gap-1 basis-[50%]">
            <label className="mb-2 text-xl">Phone Number</label>
            <input
              type="tel"
              readOnly
              value={patient?.contact || ""}
              className="w-full px-3 py-1.5 border-b border-gray-400 outline-none font-light text-lg"
            />
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-1 basis-[50%]">
            <label className="mb-2 text-xl">Birth Date</label>
            <input
              type="date"
              readOnly
              value={patient?.dob ? patient.dob.substring(0, 10) : ""}
              className="w-full px-3 py-1.5 border-b border-gray-400 outline-none font-light text-lg"
            />
          </div>
          <div className="flex flex-col gap-1 basis-[50%]">
            <label className="mb-2 text-xl">Gender</label>
            <input
              readOnly
              value={patient?.gender || ""}
              className="w-full px-3 py-1.5 border-b border-gray-400 outline-none font-light text-lg"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="mb-2 text-xl">Doctor Assigned</label>
          <input
            type="text"
            readOnly
            value={patient?.doctor || "No doctor assigned"}
            className="w-full px-3 py-1.5 border-b border-gray-400 text-xl"
          />
        </div>
      </form>

      {/* Appointments Section */}
      <div className="mt-16">
        <h3 className="mb-1 text-3xl font-medium md:text-4xl max-md:mb-5">
          Your Appointments
        </h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <AppointCard key={index} appointment={appointment} />
            ))
          ) : (
            <p className="text-lg text-center">No appointments found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
