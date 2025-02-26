import React, { useState } from "react";
import reviews from "./data";

function DocDetails() {
  const [show, setShow] = useState(false);

  return (
    <>
      {/* =============== About section ================= */}
      <div className="px-12 py-6 xl:px-60" id="about-wrapper">
        <h2 className="mb-3 text-3xl md:mb-6 md:text-5xl">About Dr.FullName</h2>
        <p className="max-md:text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
          reiciendis nihil fuga, beatae dolor voluptate possimus nobis porro?
          Cumque, dolore. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Exercitationem, quas! <br />
          {show ? (
            <span>
              <br />
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Doloribus animi dolorum libero dolor commodi officia, iusto
              voluptatem tempore aliquid doloremque saepe voluptate consequuntur
              velit exercitationem at neque vitae minus, aspernatur, praesentium
              debitis vel veniam facere. Consequuntur dolor doloribus quo
              quidem. <br /> <br /> Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Saepe doloremque iusto eveniet sint, rerum magni
              dolores incidunt vitae dolorem voluptatem.
            </span>
          ) : null}
        </p>
        <p
          onClick={() => setShow(!show)}
          className="underline cursor-pointer max-md:text-lg underline-offset-2"
        >
          {!show ? "Show More..." : "Show Less..."}
        </p>
      </div>

      {/* =============== Education section ================= */}
      <div className="px-12 py-6 mb-5 xl:px-60" id="edu-wrapper">
        <h2 className="mb-3 text-3xl md:mb-6 md:text-5xl">
          Education and background
        </h2>

        <div className="flex flex-col gap-1 mb-6">
          <h3 className="text-xl md:text-2xl max-md:font-medium">
            Specialties
          </h3>
          <p className="md:text-lg">Oral Surgeon</p>
        </div>

        <div className="flex flex-col gap-1 mb-6">
          <h3 className="text-xl md:text-2xl max-md:font-medium">
            Practice names
          </h3>
          <p className="md:text-lg">
            Upper East Oral and Maxillofacial Surgery
          </p>
        </div>

        <div className="flex flex-col gap-1 mb-6">
          <h3 className="text-xl md:text-2xl max-md:font-medium">
            Hospital affiliations
          </h3>
          <p className="md:text-lg">NYU Langone Medical Center</p>
        </div>

        <div className="flex flex-col gap-1 mb-6">
          <h3 className="text-xl md:text-2xl max-md:font-medium">
            Board certifications
          </h3>
          <p className="md:text-lg">
            Board Certified Oral and Maxillofacial Surgeon
          </p>
        </div>

        <div className="flex flex-col gap-1 mb-6">
          <h3 className="text-xl md:text-2xl max-md:font-mediumfont-medium">
            Education and training
          </h3>
          <p className="md:text-lg">
            Dental School - Boston University, Doctor of Dental Medicine
          </p>
          <p className="md:text-lg">
            Woodhull Hospital, Internship in Oral and Maxillofacial Surgery
          </p>
          <p className="md:text-lg">
            NYU College of Dentistry, Internship in oral surgery
          </p>
        </div>

        <div className="flex flex-col gap-1 mb-6">
          <h3 className="text-xl md:text-2xl max-md:font-medium">
            Professional memberships
          </h3>
          <p className="md:text-lg">
            International Association of Oral and Maxillofacial Surgeons
          </p>
        </div>

        <div className="flex flex-col gap-1 mb-6">
          <h3 className="text-xl md:text-2xl max-md:font-medium">
            Languages spoken
          </h3>
          <p className="md:text-lg">English</p>
          <p className="md:text-lg">Hindi</p>
          <p className="md:text-lg">Japanese</p>
        </div>

        <div className="flex flex-col gap-1 mb-6">
          <h3 className="text-xl md:text-2xl max-md:font-medium">
            Provider's gender
          </h3>
          <p className="md:text-lg">Female</p>
        </div>
      </div>

      {/* =============== Review  section ================= */}
      <div className="px-12 py-6 mb-5 xl:px-60" id="review-wrapper">
        <h2 className="mb-3 text-3xl md:mb-6 md:text-5xl">Patient Reviews</h2>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-around">
          <div className="flex flex-col items-start">
            <h3 className="text-xl font-medium md:text-2xl">Overall rating</h3>
            <div className="text-lg text-primary md:text-xl">
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-half-fill"></i>
            </div>
          </div>

          <div className="flex flex-col items-start">
            <h3 className="text-xl font-medium md:text-2xl">Wait time</h3>
            <div className="text-lg text-primary md:text-xl">
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
            </div>
          </div>

          <div className="flex flex-col items-start">
            <h3 className="text-xl font-medium md:text-2xl">Bedside manner</h3>
            <div className="text-lg text-primary md:text-xl">
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-half-fill"></i>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5 px-8 py-5 mt-6 rounded-lg bg-ternary">
          <i className="text-5xl ri-shield-user-line max-sm:hidden text-ternaryDark"></i>
          <p className="font-medium sm:text-lg text-ternaryDark">
            Your trust is our top concern, so providers can't pay to alter or
            remove reviews. We also don't publish reviews that contain any
            private patient health information.
          </p>
        </div>

        <div className="mt-10 mb-4 sm:flex sm:justify-between sm:items-center">
          <h3 className="text-xl font-medium md:text-2xl max-sm:hidden">
            100+ reviews
          </h3>
          <div className="flex flex-col gap-5 sm:flex-row">
            <input
              type="text"
              name="search"
              autoComplete="off"
              id="search"
              placeholder="Search.."
              className="px-3 py-1 border-2 rounded-full outline-none border-slate-400 focus:border-primary"
            />

            <select
              name="category"
              id="category"
              className="px-3 py-1 border-2 rounded-lg border-slate-300 focus:border-primary"
            >
              <option value="relevant">Most Relevant</option>
              <option value="high">Highest rated</option>
              <option value="low">Lowest rated</option>
              <option value="new">Newest</option>
              <option value="old">Oldest</option>
            </select>
          </div>
        </div>

        <div>
          {reviews.map((item) => (
            <div key={item.id} className="">
              <div className="mb-2">
                {Array(item.star)
                  .fill()
                  .map((starItem, index) => (
                    <i
                      key={index}
                      className="mr-1 text-lg ri-star-fill text-primary"
                    ></i>
                  ))}
              </div>
              <p className="mb-1 sm:text-xl">{item.message}</p>
              {item.credits ? (
                <div className="flex items-center gap-2 mb-3 sm:gap-4 opacity-70 max-sm:text-sm">
                  <p>Date</p>
                  <span className="w-[5px] h-[5px] rounded-[50%] bg-[#131B23]"></span>
                  <p>Name</p>
                  <span className="w-[5px] h-[5px] rounded-[50%] bg-[#131B23]"></span>
                  <p>Verified Patient</p>
                </div>
              ) : (
                <div className="flex items-center gap-2 mb-3 sm:gap-4 opacity-70 max-sm:text-sm">
                  <p>Date</p>
                  <span className="w-[5px] h-[5px] rounded-[50%] bg-[#131B23]"></span>
                  <p>Initials Hidden</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-12 py-6 mb-5 xl:px-60">
        <a href="#highlight">
          <button type="button" className="flex items-center gap-3 px-4 py-2 text-lg border-2 border-gray-300">
            Back to top <i className="ri-arrow-up-line"></i>
          </button>
        </a>
      </div>
    </>
  );
}

export default DocDetails;
