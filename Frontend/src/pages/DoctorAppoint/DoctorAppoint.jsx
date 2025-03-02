import React, { useState, useEffect } from "react";
import axios from "axios";

function DoctorAppoint() {
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]); // Ensure this is an array
  const [showPopup, setShowPopup] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [prescription, setPrescription] = useState("");
  // const [email, setEmail] = useState("");  // Add a state for the doctor's email
  const [error, setError] = useState("");  // Add error state
  const email = sessionStorage.getItem("email");  // Fetch doctor email from session storage

  // Fetch doctor ID based on email
  const fetchDoctorId = async () => {
    try {
      console.log("Fetching doctor ID for email:", email);  // Log to inspect the email
      const response = await axios.get("http://localhost:8080/auth/getDoctorId", {
        params: { email },
      });
      setDoctor(response.data.doctorId);
      console.log("Doctor:" + response.data.doctorId);  // Log to inspect the structure of the response
    } catch (error) {
      console.error("Error fetching doctor:", error);
      setError("Doctor not found.");
    }
  };

  const currentDoctorId = doctor ? doctor.doctorId : 1;  // Use doctor ID after it's fetched or fallback to 2

  console.log("Doctor ID:", email);  // Log doctor ID to inspect
  // Fetch appointments on component mount
  useEffect(() => {
    if (email) {
      fetchDoctorId();  // Fetch doctor data based on email
    }
  }, [email]);
  
  useEffect(() => {
    if (currentDoctorId) {
      axios
        .get(`http://localhost:8080/fetch/doctor/${currentDoctorId}`)
        .then((response) => {
          console.log(response.data); // Log to inspect the structure of the response
          setAppointments(Array.isArray(response.data) ? response.data : []); // Ensure response data is an array
        })
        .catch((error) => {
          console.error("Error fetching appointments:", error);
          setAppointments([]); // Reset appointments to empty array on error
        });
    }
  }, [currentDoctorId]);

  const handleCompleteClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowPopup(true);
  };

  const handleSubmit = () => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((app) =>
        app === selectedAppointment ? { ...app, prescription } : app
      )
    );
    setShowPopup(false);
    setPrescription("");
  };

  return (
    <>
      <div className="mx-auto p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Appointments</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Ensure appointments is an array before calling .map() */}
          {Array.isArray(appointments) && appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <div key={index} className="bg-white shadow-lg rounded-2xl p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {appointment.patient.user.name} {/* Display patient name */}
                </h3>
                <p className="text-gray-600">Age: {appointment.patient.age}</p> {/* Display patient age */}
                <p className="text-gray-600">Contact: {appointment.patient.contact}</p> {/* Display patient contact */}
                <p className="text-gray-600">Cause: {appointment.cause}</p> {/* Display appointment cause */}
                {appointment.prescription && (
                  <p className="text-gray-600 font-semibold">Prescription: {appointment.prescription}</p>
                )}
                <button
                  className="mt-3 px-2 py-1 bg-gray-500 text-white rounded-md hover:bg-primary transition duration-500"
                  onClick={() => handleCompleteClick(appointment)}
                >
                  Completed
                </button>
              </div>
            ))
          ) : (
            <p>No appointments available</p> // Message when there are no appointments or appointments are not loaded
          )}
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-2">Enter Prescription for {selectedAppointment.patient.name}</h3>
            <textarea
              className="w-full p-2 border rounded-md"
              rows="4"
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
              placeholder="Enter prescription here..."
            ></textarea>
            <div className="flex justify-end mt-4">
              <button
                className="px-3 py-1 bg-red-500 text-white rounded-md mr-2 hover:bg-red-700"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-700"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DoctorAppoint;
