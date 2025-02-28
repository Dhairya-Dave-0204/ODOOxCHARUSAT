import React from 'react'

function SubStatsAdmin() {
  return (
    <>
        {/* Bottom Stats Section */}
      <div className="grid grid-cols-2 gap-6 mt-6 lg:grid-cols-4 xl:grid-cols-6">
        {[
          { label: "Appointments", value: 639, icon:"ri-verified-badge-line" },
          { label: "Doctors", value: 83, icon:"ri-stethoscope-line" },
          { label: "Staff", value: 296, icon:"ri-first-aid-kit-line" },
          { label: "Operations", value: 49, icon:"ri-lungs-line" },
          { label: "Admitted", value: 372, icon:"ri-hotel-bed-line" },
          { label: "Discharged", value: 253, icon:"ri-walk-line" },
        ].map((stat, index) => (
          <div key={index} className="p-4 text-center bg-white rounded-lg shadow">
            <i className={`${stat.icon} text-light bg-primary p-4 rounded-[50%] text-2xl`}></i>
            <h2 className="mt-4 text-xl font-bold">{stat.value}</h2>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default SubStatsAdmin