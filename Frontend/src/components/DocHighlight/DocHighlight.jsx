import React from "react";
import assets from "../../assets/assets";
import { Link } from "react-router-dom"

function DocHighlight() {
  return (
    <div id="highlight" className="flex flex-col items-center justify-center gap-5 px-12 py-6 mt-10 sm:mb-20 xl:flex-row xl:px-60">
      <div className="flex flex-col gap-4 basis-2/5">
        <div className="flex items-center gap-5">
          <div className="rounded-[50%] h-24 sm:h-32 w-32 p-1 border-2 border-primary">
            <img
              src={assets.img_1}
              alt=""
              className="rounded-[50%] w-full h-full"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold md:font-medium md:text-3xl">
              Doctor Full name
            </h2>
            <h4 className="md:text-lg">Speciality</h4>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 px-6 py-4 xl:flex-row xl:gap-5 bg-ternary">
          <div className="flex items-center gap-3 xl:flex-col">
            <h2 className="text-4xl md:text-6xl">4.5</h2>
            <div className="text-lg text-secondary">
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-half-fill"></i>
            </div>
          </div>

          <hr className="w-2 bg-gray-700 h-28 max-xl:hidden" />

          <div className="">
            <p className="mb-2">
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
              magnam laborum, dolorem excepturi beatae a neque temporibus
              officia optio maxime."
            </p>

            <a href="#review-wrapper"> <p className="text-sm underline cursor-pointer">See all reviews</p> </a>
          </div>
        </div>
      </div>

      <hr className="w-1 h-64 bg-gray-400 max-xl:hidden" />

      <div className="flex flex-col items-center gap-5 max-xl:hidden">
        <div className="flex gap-10 text-lg font-medium">
          <h3 className="underline cursor-pointer underline-offset-2">Highlights</h3>
          <a href="#about-wrapper"> <h3 className="cursor-pointer ">About</h3> </a>
          <a href="#edu-wrapper"> <h3 className="cursor-pointer ">Education</h3> </a> 
          <a href="#review-wrapper"> <h3 className="cursor-pointer ">Reviews</h3> </a>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="flex gap-3">
            <i className="text-3xl fa-regular fa-handshake text-primary"></i>
            <div className="">
              <h4 className="text-lg font-medium">Patients often return</h4>
              <p className="text-base">More patients return than other providers in area</p>
            </div>
          </div>
          <div className="flex gap-3">
            <i className="text-3xl fa-regular fa-clock text-primary"></i>
            <div className="">
              <h4 className="text-lg font-medium">Excellent wait time</h4>
              <p className="text-base">100% of patients waited less than 30 minutes</p>
            </div>
          </div>
          <div className="flex gap-3">
            <i className="text-3xl bx bx-party text-primary"></i>
            <div className="">
              <h4 className="text-lg font-medium">Highly recommended</h4>
              <p className="text-base">90% of patients gave this doctor 5 stars</p>
            </div>
          </div>
          <div className="flex gap-3">
            <i className="text-3xl fa-regular fa-calendar-plus text-primary"></i>
            <div className="">
              <h4 className="text-lg font-medium">New patient appointments</h4>
              <p className="text-base">Appointments available for new patients</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocHighlight;