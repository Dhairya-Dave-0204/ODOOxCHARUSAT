import React, { useState, useEffect } from "react";
import axios from "axios";

function PatientAdd() {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [time, setTime] = useState("");
  const [dateType2, setDateType2] = useState("text"); // Initially text to show placeholder
  const [dateType1, setDateType1] = useState("text"); // Initially text to show placeholder
  const [timeType, setTimeType] = useState("text"); // Initially text to show placeholder

  const [doctors, setDoctors] = useState([]); // State to store doctors

  // ✅ Fetch doctors from backend
  useEffect(() => {
    document.querySelectorAll('input[type="text"]').forEach((input) => {
      let placeholder = input.getAttribute("data-placeholder");
      input.setAttribute("placeholder", placeholder);
    });

    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/fetch/alldoctors"
        ); // Update with your API endpoint
        setDoctors(response.data); // Assuming API returns an array of doctors
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const addPatient = async (e) => {
    e.preventDefault();
    const form = e.target;

    // ✅ Construct FormData properly
    const formData = {
      name: form.name.value,
      email: form.mail.value,
      contact: form.phone.value,
      age: form.age.value,
      dob: form.dob.value,
      gender: form.gender.value,
      doctorId: form.doctorid.value,
      user: {
        email: form.mail.value,
        password: form.dob.value, // Default password is DOB
      },
    };

    console.log("Submitting:", formData);

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/addPatient",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Success:", response.data);
    } catch (error) {
      console.error(
        "Patient registration failed:",
        error.response ? error.response.data : error
      );
    }
  };

  return (
    <div className="flex flex-col items-center p-6 md:p-12">
    <form onSubmit={addPatient} className="flex flex-col w-full gap-8 lg:flex-row">
      {/* Patient Details */}
      <div className="flex flex-col w-full gap-4 lg:w-1/2">
        <h2 className="text-3xl">Patient Details</h2>
        <label className="flex flex-col gap-1">Full Name
          <input type="text" name="name" required className="input-field" placeholder="Full Name" />
        </label>
        <label className="flex flex-col gap-1">Email
          <input type="email" name="mail" required className="input-field" placeholder="E-mail address" />
        </label>
        <label className="flex flex-col gap-1">Phone Number
          <input type="tel" name="phone" required minLength={10} maxLength={10} className="input-field" placeholder="Phone Number" />
        </label>
        <label className="flex flex-col gap-1">Age
          <input type="number" name="age" required className="input-field" placeholder="Age" />
        </label>
        <label className="flex flex-col gap-1">Date of Birth
          <input name="dob" type={dateType1} value={date1} placeholder="Date of Birth" onFocus={() => setDateType1("date")} onBlur={() => !date1 && setDateType1("text")} onChange={(e) => setDate1(e.target.value)} required className="input-field" />
        </label>
        <label className="flex flex-col gap-1">Gender
          <select name="gender" required className="input-field">
            <option value="" disabled selected>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
      </div>
      
      {/* Appointment Details */}
      <div className="flex flex-col w-full gap-4 lg:w-1/2">
        <h2 className="text-3xl">Appointment Details</h2>
        <label className="flex flex-col gap-1">Date of Appointment
          <input name="appoint" type={dateType2} value={date2} placeholder="Date of Appointment" onFocus={() => setDateType2("date")} onBlur={() => !date2 && setDateType2("text")} onChange={(e) => setDate2(e.target.value)} required className="input-field" />
        </label>
        <label className="flex flex-col gap-1">Time of Appointment
          <input name="time" type={timeType} value={time} placeholder="Select a time" onFocus={() => setTimeType("time")} onBlur={() => !time && setTimeType("text")} onChange={(e) => setTime(e.target.value)} required className="input-field" />
        </label>
        <label className="flex flex-col gap-1">Select Doctor
          <select name="doctorid" required className="input-field">
            <option value="" disabled selected>Select a Doctor</option>
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>{doctor.name} - {doctor.specialization}</option>
              ))
            ) : (
              <option disabled>Loading doctors...</option>
            )}
          </select>
        </label>
        <button type="submit" className="w-full py-3 mt-4 text-lg font-medium text-white transition duration-500 rounded-lg bg-primary hover:bg-secondary">Add Appointment</button>
      </div>
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
        border-color: #00acb1;
      }
    `}</style>
  </div>
  );
}

export default PatientAdd;
