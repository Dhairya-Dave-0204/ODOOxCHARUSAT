import React from "react";
import assets from "../../assets/assets";

function Testimonial() {
  return (
    <div className="px-12 py-6 mt-10 mb-24 xl:px-60">
      <h2 className="mb-2 text-4xl font-semibold text-center md:text-6xl text-primary">
        Testimonials
      </h2>

      <p className="mb-12 text-base font-light text-center md:text-2xl">
        See what our users say about us
      </p>

      <div className="flex flex-col gap-8 xl:grid xl:grid-cols-10 xl:grid-rows-3">
        <div className="xl:col-span-4 xl:row-span-2 rounded-2xl p-[1.3px] bg-slate-200 hover:scale-105 transition-all duration-500 hover:bg-gradient-to-br hover:from-blue-300 hover:via-purple-300 hover:to-sky-300">
          <div className="w-full h-full bg-white rounded-2xl">
            <div className="flex items-center gap-3 p-3 md:justify-around sm:p-6 xl:gap-10">
              <img
                src={assets.img_1}
                alt=""
                className="sm:w-20 sm:h-20 w-16 h-16 rounded-[50%] border-primary border-[3px]"
              />

              <h3 className="font-medium sm:text-2xl md:text-3xl xl:font-normal">
                Abby Campbell
              </h3>

              <div className="items-center hidden gap-1 md:flex text-primary">
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-half-fill"></i>
              </div>
            </div>
            <p className="p-4 text-sm xl:text-lg xl:font-light">
              I recently used CareConnect to schedule a doctor's appointment,
              and I was truly impressed by how quick and easy the process was.
              The platform is incredibly user-friendly, allowing me to browse
              through a list of top-rated doctors in my area, read detailed
              profiles, and even check patient reviews. <br /> <br />
              <span className="hidden xl:block">
                Booking an appointment took less than five minutes, and I
                received instant confirmation via email. When I visited the
                clinic, the doctor already had access to my medical history,
                making the consultation smooth and efficient. <br /> <br />
                It's reassuring to know that quality healthcare is just a few
                clicks away. I highly recommend CareConnect to anyone looking
                for reliable and convenient medical services!"
              </span>
            </p>
          </div>
        </div>

        <div className="xl:col-span-4 xl:row-span-1 rounded-2xl p-[1.3px] bg-slate-200 hover:scale-105 transition-all duration-500 hover:bg-gradient-to-br hover:from-blue-300 hover:via-purple-300 hover:to-sky-300">
          <div className="w-full h-full bg-white rounded-2xl">
            <div className="flex items-center gap-3 p-3 md:justify-around sm:p-6 xl:gap-14">
              <img
                src={assets.img_2}
                alt=""
                className="sm:w-20 sm:h-20 w-16 h-16 rounded-[50%] border-primary border-[3px]"
              />
              <h3 className="font-medium sm:text-2xl xl:text-3xl xl:font-normal">
                Les Mckay
              </h3>

              <div className="items-center hidden gap-1 md:flex text-primary">
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-half-fill"></i>
                <i className="ri-star-line"></i>
              </div>
            </div>
            <p className="p-4 text-sm xl:text-lg xl:font-light">
              It's reassuring to know that quality healthcare is just a few
              clicks away. I highly recommend CareConnect to anyone looking for
              reliable and convenient medical services!"
            </p>
          </div>
        </div>

        <div className="xl:col-span-2 xl:row-span-1 rounded-2xl p-[1.3px] bg-slate-200 hover:bg-gradient-to-br hover:from-blue-300 hover:via-purple-300 hover:to-sky-300 hover:scale-105 transition-all duration-500">
          <div className="w-full h-full bg-white rounded-2xl">
            <div className="flex items-center gap-3 p-3 md:justify-around sm:p-6">
              <img
                src={assets.img_3}
                alt=""
                className="sm:w-20 sm:h-20 w-16 h-16 rounded-[50%] border-primary border-[3px]"
              />
              <h3 className="font-medium sm:text-2xl">Emily Weeks</h3>

              <div className="items-center hidden gap-1 md:flex xl:hidden text-primary">
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-half-fill"></i>
                <i className="ri-star-half-fill"></i>
              </div>
            </div>
            <p className="p-4 text-sm font-light">
              I needed to find a pediatrician for my daughter, and CareConnect
              made it so simple. I was able to search specifically for child
              specialists, read detailed doctor profiles, and see real patient
              reviews.
            </p>
          </div>
        </div>

        <div className="xl:col-span-3 xl:row-span-2 rounded-2xl p-[1.3px] bg-slate-200 hover:scale-105 transition-all duration-500 hover:bg-gradient-to-br hover:from-blue-300 hover:via-purple-300 hover:to-sky-300">
          <div className="w-full h-full bg-white rounded-2xl">
            <div className="flex items-center gap-3 p-3 md:justify-around sm:p-6 xl:gap-8">
              <img
                src={assets.img_4}
                alt=""
                className="sm:w-20 sm:h-20 w-16 h-16 rounded-[50%] border-primary border-[3px]"
              />
              <h3 className="font-medium sm:text-2xl xl:text-3xl xl:font-normal">
                Johnny Horn
              </h3>

              <div className="items-center hidden gap-1 md:flex xl:hidden text-primary">
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-half-fill"></i>
                <i className="ri-star-half-fill"></i>
              </div>
            </div>
            <p className="p-4 text-sm font-light xl:text-lg">
              After struggling with a chronic health condition, I decided to try
              CareConnect to find a specialist. The platform provided detailed
              information about each doctor, including qualifications,
              experience, and patient reviews. <br /> <br />{" "}
              <span className="hidden xl:block">
                This transparency helped me choose a specialist I felt confident
                in. The appointment booking process was straightforward, and I
                appreciated the reminder notifications. My experience with the
                specialist exceeded my expectations, and I finally received the
                care and support I needed.
              </span>
            </p>
          </div>
        </div>

        <div className="xl:col-span-3 xl:row-span-2 rounded-2xl p-[1.3px] bg-slate-200 max-md:hidden hover:scale-105 transition-all duration-500 hover:bg-gradient-to-br hover:from-blue-300 hover:via-purple-300 hover:to-sky-300">
          <div className="w-full h-full bg-white rounded-2xl">
            <div className="flex items-center gap-3 p-3 md:justify-around sm:p-6 xl:gap-8">
              <img
                src={assets.img_5}
                alt=""
                className="sm:w-20 sm:h-20 w-16 h-16 rounded-[50%] border-primary border-[3px]"
              />
              <h3 className="font-medium sm:text-2xl xl:text-3xl xl:font-normal">
                Carly Frederick
              </h3>

              <div className="items-center hidden gap-1 md:flex xl:hidden text-primary">
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-half-fill"></i>
                <i className="ri-star-half-fill"></i>
              </div>
            </div>
            <p className="p-4 text-sm font-light xl:text-lg">
              When I moved to a new city, finding a reliable healthcare provider
              was daunting. Thankfully, I came across [Website Name]. I was able
              to browse through a wide selection of doctors, view their
              profiles, and read honest patient testimonials.
              <br /> <br />{" "}
              <span className="hidden xl:block">
                I booked an appointment within minutes, and the doctor turned
                out to be amazing. I love how CareConnect makes it so easy to
                find trustworthy healthcare professionals. The convenience of
                online appointment booking, combined with the quality of care I
                received, has made me a loyal user of this platform.
              </span>
            </p>
          </div>
        </div>

        <div className="xl:col-span-4 xl:row-span-1 rounded-2xl p-[1.3px] bg-slate-200 hover:scale-105 transition-all max-md:hidden duration-500 hover:bg-gradient-to-br hover:from-blue-300 hover:via-purple-300 hover:to-sky-300">
          <div className="w-full h-full bg-white rounded-2xl">
            <div className="flex items-center gap-3 p-3 md:justify-around sm:p-6 xl:gap-8">
              <img
                src={assets.img_6}
                alt=""
                className="sm:w-20 sm:h-20 w-16 h-16 rounded-[50%] border-primary border-[3px]"
              />
              <h3 className="font-medium sm:text-2xl">Cameron Mccann</h3>

              <div className="items-center hidden gap-1 md:flex text-primary">
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-half-fill"></i>
                <i className="ri-star-line"></i>
              </div>
            </div>
            <p className="p-4 text-sm font-light xl:text-lg">
              I had a fantastic experience with CareConnect. I was
              experiencing health issues and needed to consult a specialist
              quickly. The platform helped me find a highly-rated doctor, and I
              was able to book an appointment on the same day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
