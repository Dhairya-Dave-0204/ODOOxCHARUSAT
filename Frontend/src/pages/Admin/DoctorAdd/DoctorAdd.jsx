import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";

const languages = [
  "English",
  "Hindi",
  "Gujarati",
  "Tamil",
  "Telugu",
  "Kannada",
  "Marathi",
  "Russian",
];

function DoctorAdd() {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e) => {
    console.log("1")
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value, // Fixed email field name
      specialization: e.target.specialization.value,
      password: e.target.password.value,
      experience: e.target.experience.value,
      qualification: e.target.qualification.value,
      contactNumber: e.target.contactNumber.value,
      languagesSpoken: selectedLanguages.join(","), // Convert array to CSV string
    };

    console.log("Submitting:", formData);

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/addDoctor",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      window.location.href = "/admin/home";
      console.log("Success:", response.data);
      if (response.data === "Doctor added successfully!") {
        toast.success("Doctor added successfully!");
      }
    } catch (error) {
      console.error(
        "Doctor registration failed:",
        error.response ? error.response.data : error
      );
    }
  };

  const handleSelect = (language) => {
    if (!selectedLanguages.includes(language)) {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const handleRemove = (language) => {
    setSelectedLanguages(selectedLanguages.filter((l) => l !== language));
  };

  return (
    <div className="w-[90%] mx-auto mt-10 text-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-10 md:flex-row">
        <div className="flex flex-col flex-1 gap-5">
          <h2 className="mb-3 text-4xl">Doctor Information</h2>

          <div className="flex flex-col gap-3">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Full Name"
              className="px-5 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              required
              placeholder="E-mail address"
              className="px-5 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="specialization">Specialization</label>
            <select
              name="specialization"
              required
              className="px-5 py-3 font-light border border-gray-300 rounded-lg outline-none focus:border-primary"
            >
              <option value="" disabled selected>
                Select Specialization
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
              className="px-5 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary"
            />
          </div>

          <div className="w-full md:w-auto mt-6">
            <button
              type="submit"
              className="w-full px-8 py-3 text-xl font-medium text-white bg-primary rounded-lg md:w-auto hover:scale-105"
            >
              Submit
            </button>
          </div>

        </div>

        <div className="flex flex-col flex-1 gap-5">
          <h2 className="mb-3 text-4xl">Doctor Background</h2>

          <div className="flex flex-col gap-3">
            <label htmlFor="experience">Experience (in years)</label>
            <input
              type="number"
              name="experience"
              required
              placeholder="Experience"
              className="px-5 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="qualification">Qualification</label>
            <input
              type="text"
              name="qualification"
              required
              placeholder="Qualification"
              className="px-5 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="tel"
              name="contactNumber"
              required
              placeholder="Contact Number"
              className="px-5 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary"
            />
          </div>

          {/* Languages Dropdown */}
          <div className="flex flex-col gap-3">
            <label>Languages Spoken</label>
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                className="w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="block truncate">
                  {selectedLanguages.length > 0
                    ? selectedLanguages.join(", ")
                    : "Select languages"}
                </span>
              </button>

              {isDropdownOpen && (
                <ul className="absolute z-10 w-full py-1 mt-1 overflow-auto bg-white border border-gray-200 rounded-md shadow-lg max-h-60">
                  {languages.map((language, index) => (
                    <li
                      key={index}
                      className={`cursor-pointer py-2 pl-3 pr-4 hover:bg-gray-100 ${selectedLanguages.includes(language) ? "font-medium" : "font-normal"
                        }`}
                      onClick={() => handleSelect(language)}
                    >
                      {language}
                      {selectedLanguages.includes(language) && (
                        <span className="ml-2 text-green-500">✔</span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-2 space-x-2">
              {selectedLanguages.map((language) => (
                <span
                  key={language}
                  className="inline-flex items-center px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded-full"
                >
                  {language}
                  <button
                    className="ml-1 text-red-500 hover:text-red-700 focus:outline-none"
                    onClick={() => handleRemove(language)}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </form>

    </div>
  );
}

export default DoctorAdd;
