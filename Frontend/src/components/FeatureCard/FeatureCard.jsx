import React from "react";

function FeatureCard() {
  return (
    <div className="grid grid-cols-1 gap-12 px-12 py-6 mt-20 mb-20 xl:grid-cols-3 lg:grid-cols-2 xl:mt-44 xl:mb-36 xl:px-60">
      <div className="flex flex-col items-center justify-center gap-4 px-6 py-8 transition-all duration-500 bg-white shadow-xl rounded-2xl hover:scale-105 hover:shadow-2xl">
        <i className="text-6xl ri-stethoscope-line text-primary"></i>

        <h3 className="text-xl font-medium text-center md:text-2xl">Find the best medical <br /> professionals online</h3>

        <p className="text-sm font-light text-center">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium error aut similique voluptate, necessitatibus neque</p>
      </div>
      
      <div className="flex flex-col items-center justify-center gap-4 px-6 py-8 transition-all duration-500 bg-white shadow-xl rounded-2xl hover:scale-105 hover:shadow-2xl">
      <i className="text-6xl ri-nurse-line text-primary"></i>

        <h3 className="text-xl font-medium text-center md:text-2xl">View a <br /> doctor's profile</h3>

        <p className="text-sm font-light text-center">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis nihil explicabo voluptatibus reiciendis culpa nobis eos.</p>
      </div>
      
      <div className="flex flex-col items-center justify-center gap-4 px-6 py-8 transition-all duration-500 bg-white shadow-xl rounded-2xl hover:scale-105 hover:shadow-2xl">
      <i className="text-6xl ri-calendar-2-line text-primary"></i>

        <h3 className="text-xl font-medium text-center md:text-2xl">Get instant <br /> doctor appoinment</h3>

        <p className="text-sm font-light text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo voluptatem corporis aliquid voluptates aspernatur, officia rem accusamus!</p>
      </div>
    </div>
  );
}

export default FeatureCard;
