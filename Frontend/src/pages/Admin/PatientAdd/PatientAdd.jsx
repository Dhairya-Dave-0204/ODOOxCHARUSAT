import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function PatientAdd() {
  const navigate = useNavigate();

  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [time, setTime] = useState("");
  const [dateType2, setDateType2] = useState("text");
  const [dateType1, setDateType1] = useState("text");
  const [timeType, setTimeType] = useState("text");
  const [doctors, setDoctors] = useState([]);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false); // loading state to control the loading effect
  const [confirming, setConfirming] = useState(false); // confirming appointment state

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/fetch/alldoctors"
        );
        setDoctors(response.data);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const patientEmail = form.mail.value;
    setEmail(patientEmail);

    setFormData({
      name: form.name.value,
      email: patientEmail,
      contact: form.phone.value,
      age: form.age.value,
      dob: form.dob.value,
      gender: form.gender.value,
      doctorId: form.doctorid.value,
      user: {
        email: patientEmail,
        password: form.dob.value,
      },
      appointment: {
        doctorId: form.doctorid.value,
        date: form.appoint.value,
        time: form.time.value,
        cause: form.cause.value,
      },
    });

    try {
      await axios.post("http://localhost:8080/auth/sendOtp", {
        email: patientEmail,
      });
      setOtpSent(true);
      toast.success("OTP sent successfully");
    } catch (error) {
      console.error(
        "Error sending OTP:",
        error.response ? error.response.data : error
      );
    }
  };

  const verifyOtp = async () => {
    setLoading(true); // Start loading when verifying OTP
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/verifyOtp",
        { email, otp }
      );
      console.log(response.data.verified);

      if (response.data.verified) {
        setConfirming(true); // Start confirming effect after OTP verification

        const patientResponse = await axios.post(
          "http://localhost:8080/auth/addPatient",
          formData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        const patientId = patientResponse.data.patientId;
        const appointmentData = { ...formData.appointment, patientId };

        await axios.post(
          "http://localhost:8080/auth/addAppointment",
          appointmentData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        setConfirming(false); // Stop confirming effect after the appointment is added
        navigate("/admin/patient-list");
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error(
        "OTP verification failed:",
        error.response ? error.response.data : error
      );
    } finally {
      setLoading(false); // Stop loading after verification attempt is done
    }
  };

  return (
    <div className="flex flex-col items-center p-6 md:p-12">
      <form
        onSubmit={handleSubmit}
        className="w-full  flex flex-col md:flex-row gap-6 p-6 rounded-lg"
      >
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <h2 className="text-2xl">Patient Details</h2>
          <label className="flex flex-col gap-1">
            Full Name
            <input
              type="text"
              name="name"
              required
              className="input-field"
              placeholder="Full Name"
            />
          </label>
          <label className="flex flex-col gap-1">
            Email
            <input
              type="email"
              name="mail"
              required
              className="input-field"
              placeholder="E-mail address"
            />
          </label>
          <label className="flex flex-col gap-1">
            Phone Number
            <input
              type="tel"
              name="phone"
              required
              minLength={10}
              maxLength={10}
              className="input-field"
              placeholder="Phone Number"
            />
          </label>
          <label className="flex flex-col gap-1">
            Age
            <input
              type="number"
              name="age"
              required
              className="input-field"
              placeholder="Age"
            />
          </label>
          <label className="flex flex-col gap-1">
            Date of Birth
            <input
              name="dob"
              type={dateType1}
              value={date1}
              placeholder="Date of Birth"
              onFocus={() => setDateType1("date")}
              onBlur={() => !date1 && setDateType1("text")}
              onChange={(e) => setDate1(e.target.value)}
              required
              className="input-field"
            />
          </label>
          <label className="flex flex-col gap-1">
            Gender
            <select name="gender" required className="input-field">
              <option value="" disabled selected>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>

        <div className="flex flex-col w-full gap-4 lg:w-1/2">
          <h2 className="text-2xl">Appointment Details</h2>
          <label className="flex flex-col gap-1">
            Date of Appointment
            <input
              name="appoint"
              type={dateType2}
              value={date2}
              placeholder="Date of Appointment"
              onFocus={() => setDateType2("date")}
              onBlur={() => !date2 && setDateType2("text")}
              onChange={(e) => setDate2(e.target.value)}
              required
              className="input-field"
            />
          </label>
          <label className="flex flex-col gap-1">
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
          <label className="flex flex-col gap-1">
            Select Doctor
            <select name="doctorid" required className="input-field">
              <option value="" disabled selected>
                Select a Doctor
              </option>
              {doctors.length > 0 ? (
                doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialization}
                  </option>
                ))
              ) : (
                <option disabled>Loading doctors...</option>
              )}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            Cause of Visit
            <input name="cause" type="text" required className="input-field" />
          </label>
          <button
            type="submit"
            className="w-full py-3 mt-4 text-lg font-medium text-white bg-primary cursor-pointer hover:bg-secondary transition duration-500 rounded-lg"
          >
            {confirming ? "Confirming, Please Wait!!" : "Add Appointment"}
          </button>
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
          border-color: #3b82f6;
        }
      `}</style>

      {otpSent && (
        <div className="mt-6">
          <h3 className="text-xl">Verify OTP</h3>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="input-field mt-2"
          />
          <button
            onClick={verifyOtp}
            className="w-full py-2 mt-2 text-lg font-medium text-white bg-primary rounded-lg"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
          {loading && (
            <div className="mt-2 text-center text-gray-500">
              <span>Loading...</span>
            </div>
          )}
        </div>
      )}

      {confirming && (
        <div className="mt-6">
          <h3 className="text-xl">Confirming Appointment...</h3>
          <div className="text-lg">
            <span>Confirming</span>
            <span className="animate-ping text-gray-500">...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientAdd;
