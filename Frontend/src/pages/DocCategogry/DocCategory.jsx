import React from "react";
import { DocCards, ListPracticeBanner, Testimonial } from "../../components/component_index";

function DocCategory() {
  return (
    <>
      <h1 className="px-12 mt-16 mb-2 text-4xl font-medium text-center md:text-5xl">
        Book the best Doctors
      </h1>
      <h4 className="px-12 text-base font-light text-center textba md:text-xl ">
        Need to make a personalized doctor appointment this week? Use DocAppoint
        to find doctors near you. It's simple, secure and free.
      </h4>

      <div className="flex items-center justify-center min-h-[15vh] mb-20">
        <div className="rounded-xl relative w-full h-12 mx-2 sm:mx-5 sm:h-16 max-w-[900px]">
          <i className="absolute text-3xl text-gray-400 -translate-y-1/2 ri-search-line left-5 top-1/2"></i>
          <input
            type="text"
            className="w-full h-full pl-16 text-lg font-medium bg-transparent border-2 border-gray-600 outline-none rounded-xl"
          />
          <button className="absolute px-2 py-1 font-medium text-white transition-all duration-500 -translate-y-1/2 border-2 sm:px-3 sm:py-2 sm:text-lg rounded-xl top-1/2 right-5 bg-primary hover:bg-white hover:border-primary hover:text-primary">
            Search
          </button>
        </div>
      </div>

      <DocCards heading={"Top category doctors"}/>

      <Testimonial />

      <ListPracticeBanner padding={60}/>
    </>
  );
}

export default DocCategory;
