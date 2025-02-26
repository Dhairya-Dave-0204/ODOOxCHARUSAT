import React from "react";
import { useNavigate } from "react-router-dom";

function DocCategory() {
  const navigate = useNavigate();

  return (
    <>
      <h2 className="mb-10 text-5xl font-medium text-center underline underline-offset-8 decoration-primary">
        Top searched categories
      </h2>

      <div onClick={() => navigate("/doctorcat")} className="grid grid-cols-1 gap-16 px-12 py-6 mb-28 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 xl:px-40">
        <div className="flex flex-col items-center justify-center p-8 min-w-[230px] cursor-pointer bg-rgba hover:bg-hoverrgba transition-all duration-500 shadow-md">
          <div className="bg-[#fefffe] h-32 w-32 mb-5 rounded-[50%] flex items-center justify-center">
            <i className="text-5xl text-secondary fa-solid fa-hand-holding-heart"></i>
          </div>
          <h3 className="text-2xl font-medium">Primary Care</h3>
        </div>
        
        <div onClick={() => navigate("/doctorcat")} className="flex flex-col items-center justify-center p-8 min-w-[230px] cursor-pointer bg-rgba hover:bg-hoverrgba transition-all duration-500 shadow-md">
          <div className="bg-[#fefffe] h-32 w-32 mb-5 rounded-[50%] flex items-center justify-center">
            <i className="text-5xl fa-solid fa-tooth text-secondary"></i>
          </div>
          <h3 className="text-2xl font-medium">Dentist</h3>
        </div>
        
        <div onClick={() => navigate("/doctorcat")} className="flex flex-col items-center justify-center p-8 min-w-[230px] cursor-pointer bg-rgba hover:bg-hoverrgba transition-all duration-500 shadow-md">
          <div className="bg-[#fefffe] h-32 w-32 mb-5 rounded-[50%] flex items-center justify-center">
            <i className="text-5xl fa-solid fa-hand-dots text-secondary"></i>
          </div>
          <h3 className="text-2xl font-medium">Dermatologist</h3>
        </div>
        
        <div onClick={() => navigate("/doctorcat")} className="flex flex-col items-center justify-center p-8 min-w-[230px] cursor-pointer bg-rgba hover:bg-hoverrgba transition-all duration-500 shadow-md">
          <div className="bg-[#fefffe] h-32 w-32 mb-5 rounded-[50%] flex items-center justify-center">
            <i className="text-5xl fa-solid fa-brain text-secondary"></i>
          </div>
          <h3 className="text-2xl font-medium">Psychiatrist</h3>
        </div>
        
        <div onClick={() => navigate("/doctorcat")} className="flex flex-col items-center justify-center p-8 min-w-[230px] cursor-pointer bg-rgba hover:bg-hoverrgba transition-all duration-500 shadow-md max-[425px]:hidden">
          <div className="bg-[#fefffe] h-32 w-32 mb-5 rounded-[50%] flex items-center justify-center">
            <i className="text-5xl fa-solid fa-glasses text-secondary"></i>
          </div>
          <h3 className="text-2xl font-medium">Ophthalmologist</h3>
        </div>
        
        <div onClick={() => navigate("/doctorcat")} className="flex flex-col items-center justify-center p-8 min-w-[230px] cursor-pointer bg-rgba hover:bg-hoverrgba transition-all duration-500 shadow-md max-[425px]:hidden">
          <div className="bg-[#fefffe] h-32 w-32 mb-5 rounded-[50%] flex items-center justify-center">
            <i className="text-5xl fa-solid fa-heart-pulse text-secondary"></i>
          </div>
          <h3 className="text-2xl font-medium">Cardiologist</h3>
        </div>
      </div>
    </>
  );
}

export default DocCategory;
