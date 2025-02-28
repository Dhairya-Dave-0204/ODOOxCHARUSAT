import React , {useState,useEffect}from "react";
import axios from "axios";

function PatientAdd() {


  const [doctors, setDoctors] = useState([]); // State to store doctors

  // ✅ Fetch doctors from backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8080/fetch/alldoctors"); // Update with your API endpoint
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
        password: form.dob.value // Default password is DOB
      }
    };
  
    console.log("Submitting:", formData);
  
    try {
      const response = await axios.post("http://localhost:8080/auth/addPatient", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Patient registration failed:", error.response ? error.response.data : error);
    }
  };
  

  return (
    <div className="w-[70%] ml-5 mt-5 md:ml-16 md:mt-14 text-lg add">
      <form onSubmit={addPatient} className="flex flex-col gap-5">
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
            placeholder="Age"
            className="px-5 py-3 border-2 rounded-lg outline-none focus:border-primary border-slate-500"
          />
        </div>

        {/* <div className="flex flex-col gap-3">
          <label htmlFor="age">Doc</label>
          <input
            type="number"
            name="doctorid"
            required
            placeholder="docId"
            className="px-5 py-3 border-2 rounded-lg outline-none focus:border-primary border-slate-500"
          />
        </div> */}

        <div className="flex flex-col gap-3">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            name="dob"
            required
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
        {/* ✅ Doctor Selection Dropdown */}
        <div className="flex flex-col gap-3">
          <label htmlFor="doctorid">Select Doctor</label>
          <select name="doctorid" required className="px-5 py-3 border-2 rounded-lg outline-none focus:border-primary border-slate-500">
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

        

        {/* ✅ Move Submit button inside the form */}
        <button
          type="submit"
          className="px-8 py-3 mt-6 text-xl font-medium text-white transition-all duration-500 rounded-lg cursor-pointer hover:scale-105 bg-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default PatientAdd;
