import React, { useEffect, useState } from "react";
import axios from "axios";

function DoctorProfile() {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const email = sessionStorage.getItem("email");

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        // Fetch doctor ID from email
        const doctorRes = await axios.get("http://localhost:8080/auth/getDoctorId", { params: { email } });
        const doctorId = doctorRes.data.doctorId;

        // Fetch doctor details using doctor ID
        const profileRes = await axios.get(`http://localhost:8080/fetch/doctor/profile/${doctorId}`);
        setDoctor(profileRes.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
        setError("Failed to load doctor profile.");
        setLoading(false);
      }
    };

    if (email) {
      fetchDoctorProfile();
    }
  }, [email]);

  if (loading) {
    return <p className="text-center mt-10 text-xl">Loading profile...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-xl text-red-500">{error}</p>;
  }

  return (
    <>
      <h2 className="text-4xl ml-10">Profile Information</h2>
      <div className="p-6">
        <div className="bg-white p-6 rounded-2xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-lg">Full Name</label>
              <input
                type="text"
                className="w-full border border-gray-400 p-2 rounded-lg mt-1 font-light"
                value={doctor?.name || ""}
                readOnly
              />
            </div>
            <div>
              <label className="block text-lg">E-mail</label>
              <input
                type="email"
                className="w-full border border-gray-400 p-2 rounded-lg mt-1 font-light"
                value={doctor?.email || ""}
                readOnly
              />
            </div>
            <div>
              <label className="block text-lg">Specialization</label>
              <input
                type="text"
                className="w-full border border-gray-400 p-2 rounded-lg mt-1 font-light"
                value={doctor?.specialization || ""}
                readOnly
              />
            </div>
            <div>
              <label className="block text-lg">Password</label>
              <input
                type="password"
                className="w-full border border-gray-400 p-2 rounded-lg mt-1 font-light"
                value="********"
                readOnly
              />
            </div>
          </div>

          <h2 className="text-2xl mt-6">Doctor Background</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-lg">Experience (in years)</label>
              <input
                type="text"
                className="w-full border border-gray-400 p-2 rounded-lg mt-1 font-light"
                value={doctor?.experience ? `${doctor.experience} years` : ""}
                readOnly
              />
            </div>
            <div>
              <label className="block text-lg">Qualification</label>
              <input
                type="text"
                className="w-full border border-gray-400 p-2 rounded-lg mt-1 font-light"
                value={doctor?.qualification || ""}
              />
            </div>
            <div>
              <label className="block text-lg">Contact Number</label>
              <input
                type="text"
                className="w-full border border-gray-400 p-2 rounded-lg mt-1 font-light"
                value={doctor?.contactNumber || ""}
              />
            </div>
            <div>
              <label className="block text-lg">Languages Spoken</label>
              <input
                type="text"
                className="w-full border border-gray-400 p-2 rounded-lg mt-1 font-light"
                value={doctor?.languagesSpoken || ""}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorProfile;
