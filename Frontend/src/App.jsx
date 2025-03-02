import React, { useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom"; // ✅ Import useLocation
import "./App.css";
import {
  Navbar,
  Footer,
  Sidebar,
  Chatbot,
  DocSidebar,
} from "./components/component_index";
import {
  About,
  Contact,
  FAQ,
  Home,
  Survey,
  DocGeneral,
  DocProfile1,
  DocCategory,
  SignUp,
  Admin,
  PatientAdd,
  DoctorAdd,
  DoctorList,
  PatientList,
  ForgotPass,
  ResetPassword,
  UserProfile,
  BookAppoint,
  DoctorProfile,
  DoctorAppoint,
} from "./pages/page_index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "./context/AppCcontext";

function App() {
  const { isAdmin, isDoctor } = useContext(AppContext);
  const location = useLocation(); // ✅ Get current path

  // ✅ Define pages where the footer should be hidden
  const hideFooterRoutes = [
    "/signup",
    "/forgot",
    "/reset",
    "/doctor-profile",
    "/doctor-appoint",
  ];

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />

      {isAdmin ? (
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 p-5">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/survey" element={<Survey />} />
              <Route path="/doc-general" element={<DocGeneral />} />
              <Route path="/doc-profile" element={<DocProfile1 />} />
              <Route path="/doc-category" element={<DocCategory />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot" element={<ForgotPass />} />
              <Route path="/user-profile" element={<UserProfile />} />
              <Route path="/admin/home" element={<Admin />} />
              <Route path="/admin/patient" element={<PatientAdd />} />
              <Route path="/admin/doctor" element={<DoctorAdd />} />
              <Route path="/admin/patient-list" element={<PatientList />} />
              <Route path="/admin/doctor-list" element={<DoctorList />} />
            </Routes>
          </div>
        </div>
      ) : (
        <>
          {!isDoctor ? (
            <>
              <Navbar />
              <Chatbot />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/survey" element={<Survey />} />
                <Route path="/doc-general" element={<DocGeneral />} />
                <Route path="/doc-profile" element={<DocProfile1 />} />
                <Route path="/doc-category" element={<DocCategory />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot" element={<ForgotPass />} />
                <Route path="/reset" element={<ResetPassword />} />
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="/appoint" element={<BookAppoint />} />
              </Routes>
            </>
          ) : (
            <>
              <div className="flex min-h-screen">
                <DocSidebar />

                <div className="flex-1 p-5">
                  <Routes>
                    <Route path="/doctor-profile" element={<DoctorProfile />} />
                    <Route path="/doctor-appoint" element={<DoctorAppoint />} />
                  </Routes>
                </div>
              </div>
            </>
          )}

          {/* { <Chatbot />} */}

          {/* ✅ Hide Footer if current path is in hideFooterRoutes */}
          {!hideFooterRoutes.includes(location.pathname) && <Footer />}
        </>
      )}
    </>
  );
}

export default App;
