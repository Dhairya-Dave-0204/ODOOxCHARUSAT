import React from "react";

function DoctorAppoint() {
  const appointments = [
    { patientName: "John Doe", age: 30, contact: "9876543210", cause: "Fever" },
    {
      patientName: "Jane Smith",
      age: 25,
      contact: "9123456789",
      cause: "Cough",
    },
    {
      patientName: "Mike Johnson",
      age: 40,
      contact: "9234567890",
      cause: "Headache",
    },
    {
      patientName: "Emily Davis",
      age: 35,
      contact: "9345678901",
      cause: "Flu",
    },
    {
      patientName: "Robert Brown",
      age: 50,
      contact: "9456789012",
      cause: "Back Pain",
    },
    {
      patientName: "Sophia Wilson",
      age: 28,
      contact: "9567890123",
      cause: "Allergy",
    },
  ];

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
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DoctorAppoint;
