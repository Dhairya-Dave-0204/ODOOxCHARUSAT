import React, { useState } from "react";

function DoctorCards({ doctor }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="relative p-5 bg-white border border-gray-100 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-4">
          {/* <img src={doctor.image} alt={doctor.name} className="rounded-full h-14 w-14" /> */}
          <div>
            <h3 className="text-lg font-semibold">{doctor.name}</h3>
            <p className="text-sm text-gray-700">{doctor.specialization}</p>
            <p className="text-sm text-gray-500 opacity-[75%]">{doctor.email}</p>
          </div>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-2xl rounded-full cursor-pointer hover:bg-gray-200">
          &#x22EE;
        </button>
      </div>
      {menuOpen && (
        <div className="absolute right-0 z-10 w-32 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
          <button className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100">View Details</button>
          <button className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100">Assign</button>
          <button className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100">Edit</button>
          <button className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100">Delete</button>
        </div>
      )}
    </div>
    </>
  );
}

export default DoctorCards;
