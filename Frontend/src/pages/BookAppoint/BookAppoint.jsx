import React from "react";

function BookAppoint() {
  return (
    <>
      <div>
        <h2 className="mb-5 text-4xl">Book an appointment</h2>
        <div>
          <label htmlFor="appoint" className="flex flex-col gap-1">
            Date of Appointment
            <input
              name="appoint"
              placeholder="Date of Appointment"
              required
              className="input-field"
            />
          </label>
        </div>
      </div>
    </>
  );
}

export default BookAppoint;
