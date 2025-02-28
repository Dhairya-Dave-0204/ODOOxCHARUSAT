import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar, Footer, Sidebar } from "./components/component_index";
import { About, Contact, FAQ, Home, Survey, DocGeneral, DocProfile1, DocCategory, SignUp, Admin, PatientAdd, DoctorAdd, DoctorList, PatientList, ForgotPass } from "./pages/page_index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "./context/AppCcontext";


function App() {

  const { isAdmin } = useContext(AppContext)

  return (
    <>
      <ToastContainer position="bottom-right" />
      
      {
        isAdmin ? (
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 p-5">
              <Routes>
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
            <Navbar />
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
            </Routes>
            <Footer />
          </>
        )
      }
    </>
  );
}

export default App;
