import React from "react";
import assets from "../../assets/assets";

function AboutValues() {
  return (
    <div className="px-12 py-6 mb-20 xl:px-60">
      <h3 className="text-xl font-medium md:text-2xl text-primary">
        Our Values
      </h3>
      <h4 className="mb-10 text-4xl font-medium md:text-5xl">
        Our Sincerity to Our Users
      </h4>

      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 gap-14">
        <div className="p-5 md:p-10 rounded-xl shadow-[0_0px_60px_-15px_rgba(0,0,0,0.2)] border border-slate-100">
          <div className="flex items-center justify-center gap-4 mb-3">
            <img src={assets.check} alt="" className="w-16 h-16" />
            <h3 className="text-xl font-semibold md:text-2xl md:font-medium">
              Honesty
            </h3>
          </div>
          <p className="opacity-75">
            At CareConnect, honesty is at the core of everything we do. We
            believe in transparent communication.
          </p>
        </div>

        <div className="p-5 md:p-10 rounded-xl shadow-[0_0px_60px_-15px_rgba(0,0,0,0.2)] border border-slate-100">
          <div className="flex items-center justify-center gap-4 mb-3">
            <img src={assets.draw} alt="" className="w-16 h-16" />
            <h3 className="text-xl font-semibold md:text-2xl md:font-medium">
              Learning
            </h3>
          </div>
          <p className="opacity-75">
            Our dedicated team of medical professionals is committed to
            continuous education and staying updated with the latest
            advancements.
          </p>
        </div>

        <div className="p-5 md:p-10 rounded-xl shadow-[0_0px_60px_-15px_rgba(0,0,0,0.2)] border border-slate-100">
          <div className="flex items-center justify-center gap-4 mb-3">
            <img src={assets.leaf} alt="" className="w-16 h-16" />
            <h3 className="text-xl font-semibold md:text-2xl md:font-medium">
              Care
            </h3>
          </div>
          <p className="opacity-75">
            Care is more than just a service—it's the heart of everything we do.
            We are dedicated to providing patient-centered care and comfort.
          </p>
        </div>

        <div className="p-5 md:p-10 rounded-xl shadow-[0_0px_60px_-15px_rgba(0,0,0,0.2)] border border-slate-100">
          <div className="flex items-center justify-center gap-4 mb-3">
            <img src={assets.shield} alt="" className="w-16 h-16" />
            <h3 className="text-xl font-semibold md:text-2xl md:font-medium">
              Trust
            </h3>
          </div>
          <p className="opacity-75">
            We know, choosing a doctor is a significant decision, and are
            committed to earn your trust through transparency.
          </p>
        </div>

        <div className="p-5 md:p-10 rounded-xl shadow-[0_0px_60px_-15px_rgba(0,0,0,0.2)] border border-slate-100">
          <div className="flex items-center justify-center gap-4 mb-3">
            <img src={assets.passionate} alt="" className="w-16 h-16" />
            <h3 className="text-xl font-semibold md:text-2xl md:font-medium">
              Passion
            </h3>
          </div>
          <p className="opacity-75">
            At CareConnect, passion drives everything we do. Our team of
            professionals is deeply committed to improving lives through medical
            care.
          </p>
        </div>

        <div className="p-5 md:p-10 rounded-xl shadow-[0_0px_60px_-15px_rgba(0,0,0,0.2)] border border-slate-100">
          <div className="flex items-center justify-center gap-4 mb-3">
            <img src={assets.eye} alt="" className="w-16 h-16" />
            <h3 className="text-2xl font-medium">Vission</h3>
          </div>
          <p className="opacity-75">
            We strive to create a platform where everyone can connect with
            trusted healthcare professionals, receive personalized care.
          </p>
        </div>

        <div className="p-5 md:p-10 rounded-xl shadow-[0_0px_60px_-15px_rgba(0,0,0,0.2)] border border-slate-100">
          <div className="flex items-center justify-center gap-4 mb-3">
            <img src={assets.star} alt="" className="w-16 h-16" />
            <h3 className="text-xl font-semibold md:text-2xl md:font-medium">
              Future
            </h3>
          </div>
          <p className="opacity-75">
            We envision a world where accessing medical care is seamless,
            personalized, and available to everyone, anytime and anywhere.
          </p>
        </div>

        <div className="p-5 md:p-10 rounded-xl shadow-[0_0px_60px_-15px_rgba(0,0,0,0.2)] border border-slate-100">
          <div className="flex items-center justify-center gap-4 mb-3">
            <img src={assets.record} alt="" className="w-16 h-16" />
            <h3 className="text-xl font-semibold md:text-2xl md:font-medium">
              Latest Tech
            </h3>
          </div>
          <p className="opacity-75">
            Our platform integrates advanced digital tools, from AI-driven
            symptom checkers and telemedicine consultations to secure digital
            health records.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutValues;
