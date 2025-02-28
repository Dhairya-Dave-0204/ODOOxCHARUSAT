import React from "react";

const doctors = [
  { name: "James Zathila", specialty: "Gynaecologist", active: false },
  { name: "John Doe", specialty: "Radiotherapist", active: true },
  { name: "Khadiza Rehna", specialty: "General Surgeon", active: false },
  { name: "Peter Amber", specialty: "Orthopedic", active: true },
  { name: "Helen Southern", specialty: "Heart Surgeon", active: true },
  { name: "Jordan", specialty: "Heart Surgeon", active: false },
];

function DoctorRight() {
  return (
    <>
      <div className="max-w-md p-4 mx-auto rounded-lg shadow-lg">
        <h2 className="pb-2 mb-3 text-lg font-bold border-b border-gray-400">
          ACTIVE/INACTIVE DOCTORS
        </h2>
        <ul>
          {doctors.map((doctor, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-3 border-b border-gray-300 last:border-none"
            >
              <div>
                <p className="font-semibold">{doctor.name}</p>
                <p className="text-sm text-gray-500">{doctor.specialty}</p>
              </div>
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-[50%] text-white cursor-pointer ${
                  doctor.active ? "bg-green-500" : "bg-blue-500"
                }`}
              >
                {doctor.active ? "✔" : "+"}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default DoctorRight;
