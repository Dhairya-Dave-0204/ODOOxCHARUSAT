import React, { useEffect } from "react";
import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when component mounts
  }, []);

  return (
    <div className="flex flex-col gap-6 px-12 py-6 mb-24 xl:px-60 md:flex-row">
      <div className="basis-1/2">
        <h4 className="mb-1 text-sm md:text-xl text-primary">About Us</h4>
        <h2 className="mb-3 text-2xl font-medium md:text-4xl">
          A Legacy of Compassionate Care!
        </h2>
        <p className="mb-4 font-light">
          Our team of experienced professionals is committed to delivering
          quality care with empathy and excellence. We leverage innovative
          technology to bring healthcare to your fingertips, ensuring
          convenience and reliability.
        </p>

        <div className="flex flex-col gap-6 mb-6 md:flex-row md:gap-8">
          <div className="p-4 border-2 shadow-xl basis-1/2 border-slate-100 rounded-xl">
            <h3 className="mb-2 text-xl font-medium">Our Vission</h3>
            <p className="text-sm">
            We aim to inspire and empower our community through innovative solutions.
            </p>
          </div>

          <div className="p-4 border-2 shadow-xl basis-1/2 border-slate-100 rounded-xl">
            <h3 className="mb-2 text-xl font-medium">Our Mission</h3>
            <p className="text-sm">
            Our mission is to provide exceptional service and solutions that exceed customers' expectations.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/about")}
          className="px-3 py-2 text-white transition-all duration-500 rounded-lg bg-primary md:px-4 md:py-3 md:font-medium md:text-lg hover:scale-105"
        >
          View more
        </button>
      </div>

      <div className="basis-1/2">
        <img
          src={assets.about_photo}
          alt="About Us"
          className="rounded-xl sm:rounded-2xl"
        />
      </div>
    </div>
  );
}

export default About;
