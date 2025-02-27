import axios from 'axios';
import React from 'react'

function DoctorAdd() {

  const handleSubmit = async(e) => {
    
    e.preventDefault(); 

    const formData = {
     name: e.target.name.value,
     email: e.target.mail.value,
     specialization: e.target.gender.value,
     password: e.target.password.value
    }

    console.log("Submitting:", formData);

    try {
      const response = await axios.post("http://localhost:8080/auth/addDoctor", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Success:", response.data);
    }
    catch (error) {
      console.error("Doctor registration failed:", error.response ? error.response.data : error);
    }

  };

  return (
    <>
      <div className="w-[70%] ml-5 mt-5 md:ml-16 md:mt-14 text-lg add">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Full Name"
              className="px-5 py-3 border-2 rounded-lg outline-none focus:border-primary border-slate-500"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="mail">E-mail</label>
            <input
              type="email"
              name="mail"
              required
              placeholder="E-mail address"
              className="px-5 py-3 border-2 rounded-lg outline-none focus:border-primary border-slate-500"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="gender">Specialization</label>
            <select
              name="gender"
              required
              className="px-5 py-3 border-2 rounded-lg outline-none focus:border-primary border-slate-500"
            >
              <option value="" disabled selected>
                Select
              </option>
              <option value="Primary">Primary Care</option>
              <option value="General">General Surgery</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Psychiatrist">Psychiatrist</option>
              <option value="Oncologist">Oncologist</option>
              <option value="Anesthesiologist">Anesthesiologist</option>
            </select>
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              required
              minLength={8}
              maxLength={14}
              placeholder="Password"
              className="px-5 py-3 border-2 rounded-lg outline-none focus:border-primary border-slate-500"
            />
          </div>
        <button type="submit" className="px-8 py-3 mt-6 text-xl font-medium text-white transition-all duration-500 rounded-lg cursor-pointer hover:scale-105 bg-primary">Submit</button>
        </form>
      </div>
    </>
  )
}

export default DoctorAdd