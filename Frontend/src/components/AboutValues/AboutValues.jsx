import React from "react";
import assets from "../../assets/assets";

function AboutValues() {
  return (
    <div className="px-12 py-6 mb-20 xl:px-60">
      <h3 className="text-xl font-medium md:text-2xl text-primary">Our Values</h3>
      <h4 className="mb-10 text-4xl font-medium md:text-5xl">Our Sincerity to Our Users</h4>

      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 gap-14">
        
        <div className="p-5 md:p-10 rounded-xl shadow-[0_0px_60px_-15px_rgba(0,0,0,0.2)] border border-slate-100">
          <div className="flex items-center justify-center gap-4 mb-3">
            <img src={assets.check} alt="" className="w-16 h-16" />
            <h3 className="text-xl font-semibold md:text-2xl md:font-medium">Honesty</h3>
          </div>
          <p className="text-sm md:opacity-75">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate
            non fugit provident nam sit nesciunt.
          </p>
        </div>
        
        <div className="p-5 md:p-10 rounded-xl shadow-[0_0px_60px_-15px_rgba(0,0,0,0.2)] border border-slate-100">
          <div className="flex items-center justify-center gap-4 mb-3">
            <img src={assets.draw} alt="" className="w-16 h-16" />
            <h3 className="text-xl font-semibold md:text-2xl md:font-medium">Learning</h3>
          </div>
          <p className="opacity-75">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate
            non fugit provident nam sit nesciunt.
          </p>
        </div>
        
        <div className="p-5 md:p-10 rounded-xl shadow-[0_0px_60px_-15px_rgba(0,0,0,0.2)] border border-slate-100">
          <div className="flex items-center justify-center gap-4 mb-3">
            <img src={assets.leaf} alt="" className="w-16 h-16" />
            <h3 className="text-xl font-semibold md:text-2xl md:font-medium">Care</h3>
          </div>
          <p className="opacity-75">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate
            non fugit provident nam sit nesciunt.
          </p>
        </div>
        
        <div className="p-5 md:p-10 rounded-xl shadow-[0_0px_60px_-15px_rgba(0,0,0,0.2)] border border-slate-100">
          <div className="flex items-center justify-center gap-4 mb-3">
            <img src={assets.shield} alt="" className="w-16 h-16" />
            <h3 className="text-xl font-semibold md:text-2xl md:font-medium">Trust</h3>
          </div>
          <p className="opacity-75">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate
            non fugit provident nam sit nesciunt.
          </p>
        </div>
        
        <div className="p-5 md:p-10 rounded-xl shadow-[0_0px_60px_-15px_rgba(0,0,0,0.2)] border border-slate-100">
          <div className="flex items-center justify-center gap-4 mb-3">
            <img src={assets.passionate} alt="" className="w-16 h-16" />
            <h3 className="text-xl font-semibold md:text-2xl md:font-medium">Passion</h3>
          </div>
          <p className="opacity-75">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate
            non fugit provident nam sit nesciunt.
          </p>
        </div>
        
        <div className="p-5 md:p-10 rounded-xl shadow-[0_0px_60px_-15px_rgba(0,0,0,0.2)] border border-slate-100">
          <div className="flex items-center justify-center gap-4 mb-3">
            <img src={assets.eye} alt="" className="w-16 h-16" />
            <h3 className="text-2xl font-medium">Vission</h3>
          </div>
          <p className="opacity-75">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate
            non fugit provident nam sit nesciunt.
          </p>
        </div>
        
        <div className="p-5 md:p-10 rounded-xl shadow-[0_0px_60px_-15px_rgba(0,0,0,0.2)] border border-slate-100">
          <div className="flex items-center justify-center gap-4 mb-3">
            <img src={assets.star} alt="" className="w-16 h-16" />
            <h3 className="text-xl font-semibold md:text-2xl md:font-medium">Future</h3>
          </div>
          <p className="opacity-75">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate
            non fugit provident nam sit nesciunt.
          </p>
        </div>
        
        <div className="p-5 md:p-10 rounded-xl shadow-[0_0px_60px_-15px_rgba(0,0,0,0.2)] border border-slate-100">
          <div className="flex items-center justify-center gap-4 mb-3">
            <img src={assets.record} alt="" className="w-16 h-16" />
            <h3 className="text-xl font-semibold md:text-2xl md:font-medium">Latest Tech</h3>
          </div>
          <p className="opacity-75">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate
            non fugit provident nam sit nesciunt.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutValues;
