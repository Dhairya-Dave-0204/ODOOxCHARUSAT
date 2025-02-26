import React from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import { Navbar, Footer } from "./components/component_index"
import { About, Contact, FAQ, Home, Survey, DocGeneral, DocProfile1, DocCategory } from "./pages/page_index"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
    <ToastContainer position='bottom-right'/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/doc-general" element={<DocGeneral />} />
        <Route path="/doc-profile1" element={<DocProfile1 />} />
        <Route path="/doc-category" element={<DocCategory />} />
        </Routes>
        <Footer />
    </>
  )
}

export default App
