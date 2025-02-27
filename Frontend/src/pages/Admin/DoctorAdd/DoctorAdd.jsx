import React from 'react'

function DoctorAdd() {
  return (
    <>
      <div className="w-[70%] ml-5 mt-5 md:ml-16 md:mt-14 text-lg add">
        <form action="" className="flex flex-col gap-5">
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
        </form>
        <button type="submit" className="px-8 py-3 mt-6 text-xl font-medium text-white transition-all duration-500 rounded-lg cursor-pointer hover:scale-105 bg-primary">Submit</button>
      </div>
    </>
  )
}

export default DoctorAdd