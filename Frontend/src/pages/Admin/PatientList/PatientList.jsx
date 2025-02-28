import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../../../assets/assets";
import axios from "axios";


function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:8080/fetch/allpatients"); // Fetch from backend
        setPatients(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

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
        <input type="text" placeholder="Search Data..." className="w-1/3 max-w-lg p-2 border border-gray-400 rounded" />
      </div>
      <div className="w-full overflow-x-auto">
        <div className="min-w-max">
          <table className="w-full text-left border border-gray-300">
            <thead>
              <tr className="text-white bg-primary">
                <th className="p-3 whitespace-nowrap">Name</th>
                <th className="p-3 whitespace-nowrap">Gender</th>
                {/* <th className="p-3 whitespace-nowrap">Disease</th> */}
                <th className="p-3 whitespace-nowrap">Age</th>
                <th className="p-3 whitespace-nowrap">Phone</th>
                <th className="p-3 whitespace-nowrap">Email</th>
                <th className="p-3 whitespace-nowrap">Doctor</th>
                <th className="p-3 text-center whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentPatients.map((patient) => (
                <tr key={patient.id} className="border-b border-gray-400 hover:bg-gray-100">
                  <td className="flex items-center p-3 space-x-2">
                    {/* <img src={patient.image} alt="Profile" className="w-12 h-12 rounded-full" /> */}
                    <span>{patient.name}</span>
                  </td>
                  <td className="p-3">{patient.gender}</td>
                  {/* <td className="p-3">{patient.disease}</td> */}
                  <td className="p-3">{patient.age}</td>
                  <td className="p-3">{patient.contact}</td>
                  <td className="p-3">{patient.email}</td>
                  <td className="p-3">{patient.doctor}</td>
                  <td className="flex justify-center p-3 space-x-2 text-xl">
                    <button className="cursor-pointer text-primary hover:text-secondary">✏️</button>
                    <button className="text-red-600 cursor-pointer hover:text-red-800">🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span>Showing {indexOfFirstItem + 1} to {indexOfLastItem} of {patients.length} entries</span>
        <div className="flex space-x-2">
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">Previous</button>
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-4 py-2 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>{i + 1}</button>
          ))}
          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
    </>
  );
}

export default PatientList;
