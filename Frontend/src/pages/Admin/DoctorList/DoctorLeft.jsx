import React, { useState } from "react";
import assets from "../../../assets/assets";

function DoctorLeft() {
  const [activeTab, setActiveTab] = useState("Chats");

  const tabs = ["Chats", "Groups", "Contacts"];

  const chatData = [
    {
      name: "John Doe",
      message: "Lorem ipsum dolor sit amet...",
      time: "2 Hours ago",
      img: assets.doc_1,
      unread: 3,
    },
    {
      name: "John Doe",
      message: "Lorem ipsum dolor sit amet...",
      time: "3 Days ago",
      img: assets.doc_2,
    },
    {
      name: "John Doe",
      message: "Lorem ipsum dolor sit amet...",
      time: "3 Days ago",
      img: assets.doc_3,
    },
  ];

  return (
    <>
      <div className="w-full p-4 rounded-lg shadow-lg">
        {/* Profile Section */}
        <div className="flex items-center pb-4 space-x-3 border-b border-gray-300">
          <img
            src={assets.img_1}
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h2 className="font-semibold">Anny Farisha</h2>
            <p className="text-sm text-green-500">Available</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative my-3">
          <input
            type="text"
            placeholder="Search for People and Groups"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          />
        </div>

        {/* Tabs */}
        <div className="flex justify-around border-b border-gray-300">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-4 font-semibold transition-all cursor-pointer ${
                activeTab === tab
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="mt-4 space-y-4">
          {activeTab === "Chats" &&
            chatData.map((chat, index) => (
              <div
                key={index}
                className="flex items-center p-2 space-x-3 rounded-lg hover:bg-gray-100"
              >
                <img
                  src={chat.img}
                  alt={chat.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{chat.name}</h3>
                  <p className="text-sm text-gray-500 truncate">
                    {chat.message}
                  </p>
                </div>
                <div className="text-sm text-gray-400">{chat.time}</div>
              </div>
            ))}

          {activeTab === "Groups" &&
            chatData.map((group, index) => (
              <div
                key={index}
                className="flex items-center p-2 space-x-3 rounded-lg hover:bg-gray-100"
              >
                <img
                  src={assets.img_2}
                  alt="Group"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{group.name}</h3>
                  <p className="text-sm text-gray-500 truncate">
                    {group.message}
                  </p>
                </div>
                <div className="text-sm text-gray-400">{group.time}</div>
              </div>
            ))}

          {activeTab === "Contacts" &&
            chatData.map((contact, index) => (
              <div
                key={index}
                className="flex items-center p-2 space-x-3 rounded-lg hover:bg-gray-100"
              >
                <img
                  src={assets.img_3}
                  alt="Contact"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{contact.name}</h3>
                  <p className="text-sm text-gray-500 truncate">
                    {contact.message}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default DoctorLeft;
