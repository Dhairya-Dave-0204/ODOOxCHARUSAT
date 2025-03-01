import React, { useState } from "react";

function DoctorAppoint() {
  const [appointments, setAppointments] = useState([
    { patientName: "John Doe", age: 30, contact: "9876543210", cause: "Fever", prescription: "" },
    { patientName: "Jane Smith", age: 25, contact: "9123456789", cause: "Cough", prescription: "" },
    { patientName: "Mike Johnson", age: 40, contact: "9234567890", cause: "Headache", prescription: "" },
    { patientName: "Emily Davis", age: 35, contact: "9345678901", cause: "Flu", prescription: "" },
    { patientName: "Robert Brown", age: 50, contact: "9456789012", cause: "Back Pain", prescription: "" },
    { patientName: "Sophia Wilson", age: 28, contact: "9567890123", cause: "Allergy", prescription: "" },
  ]);
  
  const [showPopup, setShowPopup] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [prescription, setPrescription] = useState("");

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
          {appointments.map((appointment, index) => (
            <div key={index} className="bg-white shadow-lg rounded-2xl p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {appointment.patientName}
              </h3>
              <p className="text-gray-600">Age: {appointment.age}</p>
              <p className="text-gray-600">Contact: {appointment.contact}</p>
              <p className="text-gray-600">Cause: {appointment.cause}</p>
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
          ))}
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-2">Enter Prescription for {selectedAppointment.patientName}</h3>
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
