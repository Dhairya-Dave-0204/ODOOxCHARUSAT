import React from "react";

function MainStatsAdmin() {
  return (
    <>
      {/* Statistics Section */}
      <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "New Patients",
            value: 890,
            growth: "+40%",
            color: "text-green-600",
            icon: "ri-surgical-mask-line",
            icon_bg: "bg-[#e9fdea]",
            icon_color: "text-[#00b400]"
          },
          {
            label: "OPD Patients",
            value: 360,
            growth: "+30%",
            color: "text-blue-600",
            icon: "ri-lungs-line",
            icon_bg: "bg-[#e3eefd]",
            icon_color: "text-[#424aed]"
          },
          {
            label: "Lab Tests",
            value: 980,
            growth: "+60%",
            color: "text-red-600",
            icon: "ri-microscope-line",
            icon_bg: "bg-[#ffefec]",
            icon_color: "text-[#ff3700]"
          },
          {
            label: "Total Earnings",
            value: "$98000",
            growth: "+20%",
            color: "text-yellow-600",
            icon: "ri-money-dollar-circle-line",
            icon_bg: "bg-[#ffefec]",
            icon_color: "text-[#eeb800]"
          },
        ].map((stat, index) => (
          <div key={index} className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex gap-5">
                <i className={`${stat.icon} ${stat.icon_bg} ${stat.icon_color} rounded-[50%] p-5 text-2xl font-medium`}></i>
              <div>
                <h2 className="text-xl font-bold">{stat.value}</h2>
                <p>{stat.label}</p>
              </div>
            </div>
            <span className={`text-sm ${stat.color}`}>
              {stat.growth} this month
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default MainStatsAdmin;
