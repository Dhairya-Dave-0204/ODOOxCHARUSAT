import React from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <>
        <div className='sidebar w-[20%] min-h-[100vh] border-2 border-secondary border-t-0 text-lg'>
            <div className='sidebar-options pt-12 pl-[5%] flex flex-col gap-5 font-medium'>
                <NavLink to="/admin/home" className='sidebar-option flex items-center gap-3 border border-secondary border-r-0 py-2 px-3 rounded-t-[3px] rounded-l-[3px] cursor-pointer hover:bg-primary hover:text-light transition-all duration-500'>
                    <i className="text-2xl ri-home-4-line"></i>
                    <p>Home</p>
                </NavLink>
                
                <NavLink to="/admin/patient" className='sidebar-option flex items-center gap-3 border border-secondary border-r-0 py-2 px-3 rounded-t-[3px] rounded-l-[3px] cursor-pointer hover:bg-primary hover:text-light transition-all duration-500'>
                    <i className="text-2xl ri-user-3-line"></i>
                    <p>Add Patient</p>
                </NavLink>
                
                <NavLink to="/admin/patient-list" className='sidebar-option flex items-center gap-3 border border-secondary border-r-0 py-2 px-3 rounded-t-[3px] rounded-l-[3px] cursor-pointer hover:bg-primary hover:text-light transition-all duration-500'>
                    <i className="text-2xl ri-booklet-line"></i>
                    <p>List Patient</p>
                </NavLink>
                
                <NavLink to="/admin/doctor" className='sidebar-option flex items-center gap-3 border border-secondary border-r-0 py-2 px-3 rounded-t-[3px] rounded-l-[3px] cursor-pointer hover:bg-primary hover:text-light transition-all duration-500'>
                    <i className="text-2xl ri-stethoscope-line"></i>
                    <p>Add Doctor</p>
                </NavLink>
                
                <NavLink to="/admin/doctor-list" className='sidebar-option flex items-center gap-3 border border-secondary border-r-0 py-2 px-3 rounded-t-[3px] rounded-l-[3px] cursor-pointer hover:bg-primary hover:text-light transition-all duration-500'>
                    <i className="text-2xl ri-git-repository-line"></i>
                    <p>List Doctor</p>
                </NavLink>
            </div>
        </div>
    </>
  )
}

export default Sidebar