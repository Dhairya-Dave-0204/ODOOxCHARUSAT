import React, { useState } from "react";

function BookAppoint() {

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [dateType, setDateType] = useState("text");
  const [timeType, setTimeType] = useState("text");
  
  return (
    <>
      <div className="flex flex-col items-center p-6 md:p-12">
      <form className="flex flex-col gap-8 w-96">
        <h2 className="text-3xl">Appointment Details</h2>

        <label htmlFor="appoint" className="flex flex-col gap-1">Date of Appointment
          <input
            name="appoint"
            type={dateType}
            value={date}
            placeholder="Date of Appointment"
            onFocus={() => setDateType("date")}
            onBlur={() => !date && setDateType("text")}
            onChange={(e) => setDate(e.target.value)}
            required
            className="input-field"
          />
        </label>

        <label htmlFor="time" className="flex flex-col gap-1">Time of Appointment
          <input
            name="time"
            type={timeType}
            value={time}
            placeholder="Select a time"
            onFocus={() => setTimeType("time")}
            onBlur={() => !time && setTimeType("text")}
            onChange={(e) => setTime(e.target.value)}
            required
            className="input-field"
          />
        </label>

        <label htmlFor="doctorid" className="flex flex-col gap-1">Select Doctor
          <select name="doctorid" required className="font-light input-field">
            <option value="" disabled selected>Select a Doctor</option>
            <option value="1">Dr. Smith - Cardiology</option>
            <option value="2">Dr. John - Neurology</option>
            <option value="3">Dr. Emma - Pediatrics</option>
          </select>
        </label>

        <label htmlFor="cause" className="flex flex-col gap-1">Cause of Visit
          <input
            name="cause"
            type="text"
            placeholder="Enter reason for visit"
            required
            className="input-field"
          />
        </label>

        <button
          type="submit"
          className="w-full py-3 mt-4 text-lg font-medium text-white transition duration-500 rounded-lg bg-primary hover:bg-secondary"
        >
          Add Appointment
        </button>
      </form>

      <style jsx>{`
        .input-field {
          width: 100%;
          padding: 10px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          outline: none;
          font-size: 16px;
          transition: border 0.3s ease;
          background-color: white;
        }
        .input-field:focus {
          border-color: #3b82f6;
        }
      `}</style>
    </div>
    </>
  );
}

export default BookAppoint;
