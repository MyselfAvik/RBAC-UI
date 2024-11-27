import React, { useState } from "react";
import profileImg from "../assets/profileIcon.png";
import { useNavigate } from "react-router-dom";
const Drawer = ({ email }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="sm:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleDrawer}
          className="p-2 text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 transition-all"
        >
          ☰
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 h-full bg-blue-600 w-64 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out sm:translate-x-0 sm:relative sm:block sm:w-1/4 shadow-lg z-40`}
      >
        <div className="h-full flex flex-col items-center">
          <img
            className="h-32 w-32 rounded-full mt-8 border-4 border-white shadow-md"
            src={profileImg}
            alt="profile"
          />
          <div className="text-white text-lg font-bold mt-4">Example</div>
          <div className="text-blue-200 text-sm">{email}</div>

          <hr className="w-3/4 border-blue-300 my-6" />

          <ul className="w-full text-white text-center">
            <li
              className="py-2 hover:bg-blue-500 cursor-pointer rounded-md mx-4"
              onClick={() => alert("Navigating to Dashboard")}
            >
              Dashboard
            </li>
            <li
              className="py-2 hover:bg-blue-500 cursor-pointer rounded-md mx-4"
              onClick={() => alert("Navigating to Settings")}
            >
              Settings
            </li>
            <li
              className="py-2 hover:bg-blue-500 cursor-pointer rounded-md mx-4"
              onClick={() => alert("Navigating to Notifications")}
            >
              Notifications
            </li>
          </ul>

          <div
            className="mt-auto mb-8 w-3/4 bg-red-500 text-white text-center py-2 rounded-md cursor-pointer hover:bg-red-600 shadow-md"
            onClick={() => {
              alert("Logged out!");
              navigate("/");
              setIsOpen(false);
            }}
          >
            Logout
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 sm:hidden z-30"
          onClick={toggleDrawer}
        ></div>
      )}
    </>
  );
};

export default Drawer;
