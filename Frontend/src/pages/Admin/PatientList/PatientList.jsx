import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../../../assets/assets";

function PatientList() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "Angelica",
      address: "Linden Avenue, Orlando",
      disease: "Liver Disease",
      age: 24,
      phone: "(797) 506 1265",
      email: "angelicaramos@example.com",
      image: assets.img_1,
    },
    {
      id: 2,
      name: "Brenden",
      address: "Victory Garden, Tallahassee",
      disease: "Liver Disease",
      age: 24,
      phone: "(218) 661 8316",
      email: "bradleygreer@example.com",
      image: assets.img_2,
    },
    {
      id: 3,
      name: "Bradley",
      address: "New Haven, Columbia",
      disease: "Infectious",
      age: 22,
      phone: "(634) 09 3833",
      email: "brendenwagner@example.com",
      image: assets.img_3,
    },
    {
      id: 4,
      name: "Caesar",
      address: "Birch Street, El Paso",
      disease: "Asthma",
      age: 32,
      phone: "(380) 141 1885",
      email: "caesarvance@example.com",
      image: assets.img_4,
    },
    {
      id: 5,
      name: "Dai Rios",
      address: "Fairways Cir, Vero Beach",
      disease: "Heart Attack",
      age: 7,
      phone: "(981) 756 6128",
      email: "dairiosn@example.com",
      image: assets.img_5,
    },
    {
      id: 6,
      name: "Emily",
      address: "Maple Street, Seattle",
      disease: "Diabetes",
      age: 40,
      phone: "(600) 700 8123",
      email: "emilyjones@example.com",
      image: assets.img_6,
    },
    {
      id: 7,
      name: "Frank",
      address: "Oakwood Ave, Denver",
      disease: "Hypertension",
      age: 55,
      phone: "(912) 345 6789",
      email: "frankwilson@example.com",
      image: assets.img_1,
    },
    {
      id: 8,
      name: "Grace",
      address: "Palm Blvd, Miami",
      disease: "Arthritis",
      age: 60,
      phone: "(555) 789 1234",
      email: "gracelane@example.com",
      image: assets.img_2,
    },
    {
      id: 9,
      name: "Hannah",
      address: "Pine Street, Dallas",
      disease: "Allergy",
      age: 26,
      phone: "(777) 888 9999",
      email: "hannahm@example.com",
      image: assets.img_3,
    },
    {
      id: 10,
      name: "Isaac",
      address: "Sunset Drive, San Diego",
      disease: "Migraine",
      age: 35,
      phone: "(333) 444 5555",
      email: "isaacb@example.com",
      image: assets.img_4,
    },
    {
      id: 11,
      name: "Jack",
      address: "Ocean Ave, Santa Monica",
      disease: "Depression",
      age: 29,
      phone: "(111) 222 3333",
      email: "jackt@example.com",
      image: assets.img_5,
    },
    {
      id: 12,
      name: "Kate",
      address: "Mountain Road, Denver",
      disease: "Pneumonia",
      age: 45,
      phone: "(222) 333 4444",
      email: "katep@example.com",
      image: assets.img_6,
    },
    {
      id: 13,
      name: "Leo",
      address: "River Street, Chicago",
      disease: "Anemia",
      age: 38,
      phone: "(666) 777 8888",
      email: "leob@example.com",
      image: assets.img_1,
    },
    {
      id: 14,
      name: "Mia",
      address: "Lake View, Austin",
      disease: "Bronchitis",
      age: 50,
      phone: "(888) 999 0000",
      email: "miar@example.com",
      image: assets.img_2,
    },
    {
      id: 15,
      name: "Nathan",
      address: "Hillside Ave, San Jose",
      disease: "Diabetes",
      age: 47,
      phone: "(444) 555 6666",
      email: "nathank@example.com",
      image: assets.img_3,
    },
    {
      id: 16,
      name: "Olivia",
      address: "Elm Street, Phoenix",
      disease: "High BP",
      age: 52,
      phone: "(111) 222 3334",
      email: "oliviat@example.com",
      image: assets.img_4,
    },
    {
      id: 17,
      name: "Paul",
      address: "Cedar Lane, Las Vegas",
      disease: "Obesity",
      age: 43,
      phone: "(666) 555 4444",
      email: "paulf@example.com",
      image: assets.img_5,
    },
    {
      id: 18,
      name: "Quincy",
      address: "Aspen Ave, Nashville",
      disease: "Anxiety",
      age: 36,
      phone: "(777) 666 5555",
      email: "quincyg@example.com",
      image: assets.img_6,
    },
    {
      id: 19,
      name: "Rachel",
      address: "Main Street, Boston",
      disease: "Asthma",
      age: 25,
      phone: "(888) 777 6666",
      email: "rachelm@example.com",
      image: assets.img_1,
    },
    {
      id: 20,
      name: "Sam",
      address: "Cypress Road, Atlanta",
      disease: "Arthritis",
      age: 41,
      phone: "(999) 888 7777",
      email: "samw@example.com",
      image: assets.img_2,
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPatients = patients.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(patients.length / itemsPerPage);

  return (
    <>
      <div className="p-6 mx-auto mt-5 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4 border-b border-gray-400">
          <h2 className="text-2xl font-semibold">PATIENT LIST</h2>
          <button className="px-4 py-2 text-xl transition-all duration-500 cursor-pointer text-primary hover:text-secondary">
            Add Patient
          </button>
        </div>
        <div className="flex items-center justify-between mb-4">
          <select className="p-2 border border-gray-400 rounded">
            <option>5</option>
            <option>10</option>
            <option>20</option>
          </select>
          <input
            type="text"
            placeholder="Search Data..."
            className="w-1/3 max-w-lg p-2 border border-gray-400 rounded"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-gray-300">
            <thead>
              <tr className="text-white bg-primary">
                <th className="p-3">Name</th>
                <th className="p-3">Address</th>
                <th className="p-3">Disease</th>
                <th className="p-3">Age</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Email</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentPatients.map((patient) => (
                <tr
                  key={patient.id}
                  className="border-b border-gray-400 hover:bg-gray-100"
                >
                  <td className="flex items-center p-3 space-x-2">
                    <img
                      src={patient.image}
                      alt="Profile"
                      className="rounded-[50%] w-12 h-12"
                    />
                    <span>{patient.name}</span>
                  </td>
                  <td className="p-3">{patient.address}</td>
                  <td className="p-3">{patient.disease}</td>
                  <td className="p-3">{patient.age}</td>
                  <td className="p-3">{patient.phone}</td>
                  <td className="p-3">{patient.email}</td>
                  <td className="flex justify-center p-3 space-x-2 text-xl">
                    <button className="cursor-pointer text-primary hover:text-secondary">
                      <i className="ri-pencil-line"></i>
                    </button>
                    <button className="text-red-600 cursor-pointer hover:text-red-800">
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span>
            Showing {indexOfFirstItem + 1} to {indexOfLastItem} of{" "}
            {patients.length} entries
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientList;
