import React from 'react'

function AppointCard({ appointment }) {
  return (
    <div className="p-6 bg-white border border-gray-200 shadow-lg rounded-2xl">
      <h2 className="mb-4 text-xl font-semibold text-center text-gray-800">
        Appointment Details
      </h2>
      <div className="space-y-3">
        <div className="flex justify-between pb-2 border-b">
          <span className="font-medium text-gray-600">Doctor Name:</span>
          <span className="text-gray-800">{appointment.doctorName}</span>
        </div>
        <div className="flex justify-between pb-2 border-b">
          <span className="font-medium text-gray-600">Specialization:</span>
          <span className="text-gray-800">{appointment.specialization}</span>
        </div>
        <div className="flex justify-between pb-2 border-b">
          <span className="font-medium text-gray-600">Date:</span>
          <span className="text-gray-800">{appointment.date}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Time:</span>
          <span className="text-gray-800">{appointment.time}</span>
        </div>
      </div>
    </div>
  )
}

export default AppointCard