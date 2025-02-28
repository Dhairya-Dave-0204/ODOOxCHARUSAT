import React, { useState } from "react";

function AppointList() {
  const dummyData = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Patient ${i + 1}`,
    email: `patient${i + 1}@example.com`,
    contact: `(123) 456-78${i % 10}${i % 10}`,
    date: `2025-03-${String((i % 30) + 1).padStart(2, "0")}`,
    time: `${9 + (i % 9)}:00 AM`,
    doctor: `Dr. Smith`,
    status: i % 2 === 0 ? "Confirmed" : "Pending",
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 5;

  const filteredData = dummyData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="p-4 mx-auto mt-5">
        <h1 className="mb-4 text-3xl font-semibold ">Appointments</h1>
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search Patient..."
            className="w-1/3 p-2 border rounded"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-collapse">
            <thead className="text-white bg-primary">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Contact</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Time</th>
                <th className="p-2 border">Referred Doctor</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <tr key={item.id} className="odd:bg-white even:bg-gray-100">
                  <td className="p-2 border">{item.name}</td>
                  <td className="p-2 border">{item.email}</td>
                  <td className="p-2 border">{item.contact}</td>
                  <td className="p-2 border">{item.date}</td>
                  <td className="p-2 border">{item.time}</td>
                  <td className="p-2 border">{item.doctor}</td>
                  <td className="p-2 border font-semibold text-{item.status === 'Confirmed' ? 'green' : 'red'}-500">
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded cursor-pointer disabled:opacity-50"
          >
            Previous
          </button>
          <div>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`mx-1 px-3 py-1 border rounded ${
                  currentPage === i + 1 ? "bg-blue-500 text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded cursor-pointer disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default AppointList;
