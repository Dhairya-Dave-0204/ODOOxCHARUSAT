import React , {useState, useEffect}from "react";
import assets from "../../../assets/assets";
import DoctorCards from "./DoctorCards";
import DoctorLeft from "./DoctorLeft";
import DoctorRight from "./DoctorRight";
import axios from "axios";


// const doctors = [
//   {
//     id: 1,
//     name: "Linda Barrett",
//     specialty: "Ophthalmologist",
//     location: "United States, San Francisco",
//     image: assets.img_1,
//   },
//   {
//     id: 2,
//     name: "Michael Sullivan",
//     specialty: "Dentist",
//     location: "United States, San Francisco",
//     image: assets.img_2,
//   },
//   {
//     id: 3,
//     name: "Diana Bailey",
//     specialty: "Oncologist",
//     location: "United States, San Francisco",
//     image: assets.img_3,
//   },
//   {
//     id: 4,
//     name: "Mark Hunter",
//     specialty: "Cardiologist",
//     location: "United States, New York",
//     image: assets.img_4,
//   },
//   {
//     id: 5,
//     name: "Cristina Groves",
//     specialty: "Psychiatrist",
//     location: "United States, California",
//     image: assets.img_5,
//   },
//   {
//     id: 6,
//     name: "Justin Parker",
//     specialty: "Pediatrics",
//     location: "United States, New York",
//     image: assets.img_6,
//   },
//   {
//     id: 7,
//     name: "Shirley Willis",
//     specialty: "Radiologist",
//     location: "United States, San Francisco",
//     image: assets.img_1,
//   },
//   {
//     id: 8,
//     name: "Ronald Jacobs",
//     specialty: "General Surgery",
//     location: "United States, California",
//     image: assets.img_2,
//   },
//   {
//     id: 9,
//     name: "Albert Sandoval",
//     specialty: "Neurologist",
//     location: "United States, San Francisco",
//     image: assets.img_3,
//   },
// ];

function DoctorList() {

  const [doctors, setDoctors] = useState([]); // ✅ Store doctors from backend
  const [loading, setLoading] = useState(true); // ✅ Show loading state

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8080/fetch/alldoctors"); // ✅ Fetch from backend
        setDoctors(response.data); // ✅ Store API response in state
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);
  
  return (
    <>
      <div className="p-5">
        {loading ? (
          <p className="text-center text-lg font-semibold">Loading doctors...</p>
        ) : doctors.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 md:gap-y-10">
            {doctors.map((doctor) => (
              <DoctorCards key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg font-semibold">No doctors available.</p>
        )}
      </div>

      <div className="flex flex-col gap-4 p-4 md:flex-row">
        {/* Left Side - Chat List */}
        <div className="w-full p-4 rounded-lg md:w-2/3">
          <DoctorLeft />
        </div>

        {/* Right Side - Doctor List */}
        <div className="w-full p-4 rounded-lg md:w-1/3">
          <DoctorRight />
        </div>
      </div>
    </>
  );
}

export default DoctorList;
