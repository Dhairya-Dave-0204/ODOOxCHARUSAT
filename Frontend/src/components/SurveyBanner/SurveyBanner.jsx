import React from "react";
import assets from "../../assets/assets";

function SurveyBanner() {
  return (
    <div className="flex flex-col gap-10 px-12 py-6 mb-20 xl:px-60 xl:items-center xl:flex-row">
      <div className="basis-1/2">
        <h2 className="mb-4 text-2xl md:text-3xl">Take our survey to identify potential disease</h2>
        <p className="mb-6 text-sm md:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, at
          corporis explicabo qui sint id voluptatibus nulla reprehenderit
          ducimus rerum! Lorem ipsum dolor, sit amet consectetur adipisicing
          elit. Sint, praesentium.
        </p>
        <button className="px-5 py-3 text-base font-medium text-white transition-all duration-500 bg-primary rounded-2xl hover:scale-110">Take survey now</button>
      </div>
      
      <div className="basis-1/2">
        <img src={assets.survey} alt="Survey" className="rounded-xl"/>
      </div>
    </div>
  );
}

export default SurveyBanner;
