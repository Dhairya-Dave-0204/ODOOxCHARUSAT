import React from "react";

function UserProfile() {
  return (
    <>
      <div className="px-10 py-6 mt-5 mb-32 sm:px-14 md:px-20 lg:px-28 xl:px-32 2xl:px-40">
        <div className="">
          {/* Personal Information */}
          <form action="" className="flex flex-col col-span-4 gap-4">
            <div className="flex flex-col justify-between md:items-center md:flex-row">
                <h3 className="mb-1 text-3xl font-medium md:text-4xl max-md:mb-5">Personal Information</h3>
                <button className="px-6 py-2 text-xl duration-500 rounded-md text-light bg-primary hover:scale-105">Change Password</button>
            </div>

            <div className="flex flex-col gap-5 lg:flex-row">
              <div className="flex flex-col gap-1 basis-[50%]">
                <label htmlFor="Fullname" className="mb-2 text-xl">Full Name</label>
                <input
                  type="text"
                  name="Fullname"
                  placeholder="Fullname"
                  className="w-full px-3 py-1.5 border border-gray-400 rounded-md font-light text-lg"
                />
              </div>

              <div className="flex flex-col gap-1 basis-[50%]">
                <label htmlFor="Username" className="mb-2 text-xl">E-mail</label>
                <input
                  type="email"
                  name="Email"
                  placeholder="Email"
                  className="w-full px-3 py-1.5 border border-gray-400 rounded-md font-light text-lg"
                />
              </div>
            </div>

            <div className="flex flex-col gap-5 lg:flex-row">
              <div className="flex flex-col gap-1 basis-[50%]">
                <label htmlFor="age" className="mb-2 text-xl">Age</label>
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  className="w-full px-3 py-1.5 border border-gray-400 rounded-md font-light text-lg"
                />
              </div>

              <div className="flex flex-col gap-1 basis-[50%]">
                <label htmlFor="Phone" className="mb-2 text-xl">Phone Number</label>
                <input
                  type="tel"
                  name="Phone"
                  minLength={10}
                  maxLength={10}
                  placeholder="Username"
                  className="w-full px-3 py-1.5 border border-gray-400 rounded-md font-light text-lg"
                />
              </div>
            </div>

            <div className="flex flex-col gap-5 lg:flex-row">
              <div className="flex flex-col gap-1 basis-[50%]">
                <label htmlFor="DOB" className="mb-2 text-xl">Birth Date</label>
                <input
                  type="date"
                  name="DOB"
                  placeholder="Date of Birth"
                  className="w-full px-3 py-1.5 border border-gray-400 rounded-md font-light text-lg"
                />
              </div>

              <div className="flex flex-col gap-1 basis-[50%]">
                <label htmlFor="Gender" className="mb-2 text-xl">Gender</label>
                <select
                  name="Gender"
                  id="Gender"
                  className="w-full px-3 py-1.5 border border-gray-400 rounded-md font-light text-lg"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="Address" className="mb-2 text-xl">Address</label>
              <textarea
                name="Address"
                id="Address"
                className="w-full px-3 py-1.5 border border-gray-400 rounded-md text-xl"
              ></textarea>
            </div>
          </form>
        </div>

        {/* Appointment Section */}
        <div className="mt-16">
            <h3 className="mb-1 text-3xl font-medium md:text-4xl max-md:mb-5">Your Appointments</h3>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
