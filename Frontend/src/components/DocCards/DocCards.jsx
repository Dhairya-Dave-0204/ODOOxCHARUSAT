import React from "react";
import doctors from "./data";
import { useNavigate } from "react-router-dom";

// WILL BE DONE USING MAP METHOD DYNAMICALLY FROM DATABASE BUT IS STATIC NOW

function DocCards({heading}) {

  const navigate = useNavigate()

  return (
    <>
      <h2 className="mb-16 text-5xl font-medium text-center underline underline-offset-8 decoration-primary">
        {heading}
      </h2>

      <div className="grid grid-cols-1 gap-6 px-12 py-6 mb-20 md:grid-cols-2 xl:grid-cols-4 xl:px-40">
        {doctors.map((item) => {
          return(
            <div className="flex flex-col items-center justify-center p-5 transition-all duration-500 border rounded-lg border-slate-200 hover:shadow-lg">
              <div className="w-32 h-32 p-1 rounded-[50%] border-4 border-primary mb-3">
                <img src={item.image} alt={item.name} className="rounded-[50%] w-full h-full"/>
              </div>
              <h2 className="text-2xl font-medium">{item.name}</h2>
              <h4 className="mb-2 font-medium">{item.speciality}</h4>
              <p className="mb-2 font-light max-w-56">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <button onClick={() => navigate("/doctor1")} className="px-3 py-2 text-white transition-all duration-500 rounded-lg bg-primary hover:scale-110">Appoint</button>
            </div>
          )
        })}
      </div>
    </>
  );
}

export default DocCards;
