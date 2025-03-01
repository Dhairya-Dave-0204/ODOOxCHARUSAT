import React, { useState, useEffect } from "react";
import axios from "axios"; // ✅ Added missing axios import
import AppointCard from "./AppointCard";

function UserProfile() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const email = sessionStorage.getItem("email");

  useEffect(() => {
    if (!email) {
      console.error("No email found in session");
      setError("No email found in session.");
      setLoading(false);
      return;
    }

    const fetchPatient = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/fetch/findpatient",
          {
            params: { email },
          }
        );
        setPatient(response.data);
      } catch (error) {
        console.error("Error fetching patient:", error);
        setError("Patient not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [email]); // ✅ Added dependency to run only when `email` is available

  if (loading) return <p className="text-lg text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const appointments = [
    {
      doctorName: "Dr. John Doe",
      specialization: "Cardiologist",
      date: "2025-03-05",
      time: "10:30 AM",
    },
    {
      doctorName: "Dr. Sarah Smith",
      specialization: "Dermatologist",
      date: "2025-03-06",
      time: "11:00 AM",
    },
    {
      doctorName: "Dr. Emily Brown",
      specialization: "Pediatrician",
      date: "2025-03-07",
      time: "09:30 AM",
    },
    {
      doctorName: "Dr. Michael Green",
      specialization: "Orthopedic",
      date: "2025-03-08",
      time: "01:00 PM",
    },
    {
      doctorName: "Dr. Jane Wilson",
      specialization: "Neurologist",
      date: "2025-03-09",
      time: "02:15 PM",
    },
  ];

  return (
    <>
      <div className="px-10 py-6 mt-5 mb-32 sm:px-14 md:px-20 lg:px-28 xl:px-32 2xl:px-40">
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
              <label htmlFor="Fullname" className="mb-2 text-xl">
                Full Name
              </label>
              <input
                type="text"
                name="Fullname"
                defaultValue={patient?.name} // ✅ Populate patient data
                className="w-full px-3 py-1.5 border border-gray-400 rounded-md font-light text-lg"
              />
            </div>

            <div className="flex flex-col gap-1 basis-[50%]">
              <label htmlFor="Email" className="mb-2 text-xl">
                E-mail
              </label>
              <input
                type="email"
                name="Email"
                defaultValue={patient?.email} // ✅ Populate patient email
                className="w-full px-3 py-1.5 border border-gray-400 rounded-md font-light text-lg"
                disabled
              />
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-1 basis-[50%]">
              <label htmlFor="age" className="mb-2 text-xl">
                Age
              </label>
              <input
                type="number"
                name="age"
                defaultValue={patient?.age}
                className="w-full px-3 py-1.5 border border-gray-400 rounded-md font-light text-lg"
              />
            </div>

            <div className="flex flex-col gap-1 basis-[50%]">
              <label htmlFor="Phone" className="mb-2 text-xl">
                Phone Number
              </label>
              <input
                type="tel"
                name="Phone"
                minLength={10}
                maxLength={10}
                defaultValue={patient?.contact} // ✅ Populate contact
                className="w-full px-3 py-1.5 border border-gray-400 rounded-md font-light text-lg"
              />
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-1 basis-[50%]">
              <label htmlFor="DOB" className="mb-2 text-xl">
                Birth Date
              </label>
              <input
                type="date"
                name="DOB"
                defaultValue={patient?.dob}
                className="w-full px-3 py-1.5 border border-gray-400 rounded-md font-light text-lg"
              />
            </div>

            <div className="flex flex-col gap-1 basis-[50%]">
              <label htmlFor="Gender" className="mb-2 text-xl">
                Gender
              </label>
              <select
                name="Gender"
                defaultValue={patient?.gender} // ✅ Populate gender
                className="w-full px-3 py-1.5 border border-gray-400 rounded-md font-light text-lg"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="Doctor" className="mb-2 text-xl">
              Doctor Assigned
            </label>
            <input
              type="text"
              name="Doctor"
              defaultValue={patient?.doctor} // ✅ Populate doctor's name
              className="w-full px-3 py-1.5 border border-gray-400 rounded-md text-xl"
              disabled
            />
          </div>
        </form>

        {/* Appointment Section */}
        <div className="mt-16">
          <h3 className="mb-1 text-3xl font-medium md:text-4xl max-md:mb-5">
            Your Appointments
          </h3>
          {/* Appointment details can be displayed here */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {appointments.map((appointment, index) => (
              <AppointCard key={index} appointment={appointment} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
