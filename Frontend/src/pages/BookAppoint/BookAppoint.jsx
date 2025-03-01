import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function BookAppoint() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [dateType, setDateType] = useState("text");
  const [timeType, setTimeType] = useState("text");
  const email = sessionStorage.getItem("email");
  const [doctors, setDoctors] = useState([]);
  const [patientId, setPatientId] = useState(null); // Add patientId state
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching doctors
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8080/fetch/alldoctors");
        setDoctors(response.data);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    // Check if email exists in sessionStorage
    if (!email) {
      toast.error("Please Login First");
      navigate("/signup");
      setLoading(false);
      return;
    }

    // Fetch patientId based on the email
    const fetchPatientId = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/auth/getPatientId?email=${email}`);
        if (response.data && response.data.patientId) {
          setPatientId(response.data.patientId); // Store the patientId in state
        } else {
          toast.error("Patient not found!");
        }
      } catch (error) {
        console.error("Failed to fetch patient ID:", error);
        toast.error("Failed to fetch patient ID");
      }
    };

    fetchPatientId();
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const doctorId = form.doctorid.value;
    const cause = form.cause.value;

    // Validate all required fields
    if (!date || !time || !doctorId || !cause || !patientId) {
      toast.error("Please fill in all the fields");
      return;
    }

    // Data to be sent to the backend
    const appointmentData = {
      date: form.appoint.value,
      time: form.time.value,
      doctorId: doctorId,
      cause: cause,
      patientId: patientId, // Using the patientId from the state
    };

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8080/auth/addAppointment", appointmentData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        toast.success("Appointment booked successfully");
        navigate("/user-profile");
      } else {
        toast.error("Failed to book appointment");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("An error occurred while booking the appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center p-6 md:p-12">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-96">
          <h2 className="text-3xl">Appointment Details</h2>

          <label htmlFor="appoint" className="flex flex-col gap-1">
            Date of Appointment
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

          <label htmlFor="time" className="flex flex-col gap-1">
            Time of Appointment
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

          <label htmlFor="doctorid" className="flex flex-col gap-1">
            Select Doctor
            <select name="doctorid" required className="input-field">
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialization}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="cause" className="flex flex-col gap-1">
            Cause of Visit
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
