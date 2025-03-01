import React from "react";
import assets from "../../assets/assets";

function DoctorProfile() {
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
                required
                className="w-full border border-gray-400 p-2 rounded-lg mt-1 font-light"
                value="gene.rodrig"
                readOnly
              />
            </div>
            <div>
              <label className="block text-lg ">E-mail</label>
              <input
                type="email"
                className="w-full border border-gray-400 p-2 rounded-lg mt-1 font-light"
                value="Gene@one.com"
                readOnly
              />
            </div>
            <div>
              <label className="block text-lg ">Specialization</label>
              <input
                type="text"
                className="w-full border border-gray-400 p-2 rounded-lg mt-1 font-light"
                value="Gener"
                readOnly
              />
            </div>
            <div>
              <label className="block text-lg ">Password</label>
              <input
                type="password"
                value="password"
                readOnly
                className="w-full border border-gray-400 p-2 rounded-lg mt-1 font-light"
              />
            </div>
          </div>

          <h2 className="text-2xl mt-6">Doctor Background</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-lg ">Experience (in years)</label>
              <input
                type="text"
                className="w-full border border-gray-400 p-2 rounded-lg mt-1 font-light"
                value="5+ years"
                readOnly
              />
            </div>
            <div>
              <label className="block text-lg ">Qualification</label>
              <input
                type="text"
                className="w-full border border-gray-400 p-2 rounded-lg mt-1 font-light"
                value="Qualification"
              />
            </div>
            <div>
              <label className="block text-lg ">Contact Number</label>
              <input
                type="text"
                className="w-full border border-gray-400 p-2 rounded-lg mt-1 font-light"
                value="9807654321"
              />
            </div>
            <div>
              <label className="block text-lg ">Languages Spoken</label>
              <input
                type="text"
                className="w-full border border-gray-400 p-2 rounded-lg mt-1 font-light"
                value="English, Hindi"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorProfile;
