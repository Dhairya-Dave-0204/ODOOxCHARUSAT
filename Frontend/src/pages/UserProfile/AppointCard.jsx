import React from "react";

function AppointCard({ appointment }) {
  return (
    <div className="p-6 bg-white border border-gray-200 shadow-lg rounded-2xl">
      <h2 className="mb-4 text-xl font-semibold text-center text-gray-800">
        Appointment Details
      </h2>
      <div className="space-y-3">
        <div className="flex justify-between pb-2 border-b">
          <span className="font-medium text-gray-600">Doctor:</span>
          <span className="text-gray-800">{appointment?.doctor?.user?.name || "N/A"}</span>
        </div>
        <div className="flex justify-between pb-2 border-b">
          <span className="font-medium text-gray-600">Specialization:</span>
          <span className="text-gray-800">{appointment?.doctor?.specialization || "N/A"}</span>
        </div>
        <div className="flex justify-between pb-2 border-b">
          <span className="font-medium text-gray-600">Date:</span>
          <span className="text-gray-800">{appointment?.date || "N/A"}</span>
        </div>
        <div className="flex justify-between pb-2 border-b">
          <span className="font-medium text-gray-600">Time:</span>
          <span className="text-gray-800">{appointment?.time || "N/A"}</span>
        </div>
        <div className="flex justify-between pb-2 border-b">
          <span className="font-medium text-gray-600">Cause:</span>
          <span className="text-gray-800">{appointment?.cause || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Status:</span>
          <span
            className={`font-semibold ${
              appointment?.status === "CONFIRMED"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {appointment?.status || "Pending"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AppointCard;
