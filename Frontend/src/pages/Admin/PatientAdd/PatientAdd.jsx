import React from "react";

function PatientAdd() {
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
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              name="phone"
              required
              minLength={10}
              maxLength={10}
              placeholder="Phone Number"
              className="px-5 py-3 border-2 rounded-lg outline-none focus:border-primary border-slate-500"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              name="age"
              required
              minLength={1}
              maxLength={3}
              placeholder="Age"
              className="px-5 py-3 border-2 rounded-lg outline-none focus:border-primary border-slate-500"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              name="dob"
              required
              placeholder="D.O.B"
              className="px-5 py-3 border-2 rounded-lg outline-none focus:border-primary border-slate-500"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              required
              className="px-5 py-3 border-2 rounded-lg outline-none focus:border-primary border-slate-500"
            >
              <option value="" disabled selected>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
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
  );
}

export default PatientAdd;
