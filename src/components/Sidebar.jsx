import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink
import logo from "../images/logo.png";
import { FiHome } from "react-icons/fi";
import { BiTask } from "react-icons/bi";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa6";
import { TbSettings } from "react-icons/tb";
import { MdOutlineLightMode } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa6";

const Sidebar = () => {
  return (
    <div className="fixed inset-y-0 left-0 z-40 w-64 bg-[#ffffff] border-r-2 transition-transform border-[#E2E8F0] sm:translate-x-0 h-screen flex flex-col">
      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center w-full justify-between text-black gap-2 py-4 pl-5 pr-8 border-b border-[#E2E8F0]">
            <div className="flex gap-2 items-center justify-center">
              <img src={logo} alt="" className="w-[32px] h-[32px]" />
              <p className="text-[1.25rem] font-bold">Orbit</p>
            </div>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-panel-right-open h-4 w-4"
              >
                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                <path d="M15 3v18"></path>
                <path d="m10 15-3-3 3-3"></path>
              </svg>
            </button>
          </div>
          <div className="pl-3 pr-1 py-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex hover:bg-[#e5e7eb7a] my-1 text-[#000000c3] items-center gap-2 rounded-md py-2 px-3 ${
                  isActive ? "bg-[#e5e7eb]" : ""
                }`
              }
            >
              <div className="font-bold text-[16px]">
                <FiHome />
              </div>
              <p className="text-[14px]">Home</p>
            </NavLink>
            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                `flex hover:bg-[#e5e7eb7a] my-1 text-[#000000c3] items-center gap-2 rounded-md py-2 px-3 ${
                  isActive ? "bg-[#e5e7eb]" : ""
                }`
              }
            >
              <div className="font-bold text-[16px]">
                <BiTask />
              </div>
              <p className="text-[14px]">Tasks</p>
            </NavLink>
            <NavLink
              to="/agents"
              className={({ isActive }) =>
                `flex hover:bg-[#e5e7eb7a] my-1 text-[#000000c3] items-center gap-2 rounded-md py-2 px-3 ${
                  isActive ? "bg-[#e5e7eb]" : ""
                }`
              }
            >
              <div className="font-bold text-[16px]">
                <MdOutlinePeopleAlt />
              </div>
              <p className="text-[14px]">Agents</p>
            </NavLink>
          </div>
          <div className="border-b-[.5px] border-[#E2E8F0] ml-3 mr-1 my-4 "></div>
          <div className="pl-5 pr-3 mt-6 ">
            <div className="text-gray-500  flex items-center text-[.75rem] font-medium gap-2">
              <IoMdTime className="text-lg" />
              <p>Chat History</p>
            </div>
            <div className="flex items-center justify-between text-[.875rem] text-[#64748b] hover:text-black mt-3">
              <p>Today</p>
              <FaChevronDown className="text-xs" />
            </div>
            <div className="flex items-center justify-between text-[.875rem] text-[#64748b] hover:text-black mt-5">
              <p>Previous</p>
              <FaChevronDown className="text-xs" />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-[.5px] border-[#E2E8F0] pl-2 pr-1 mt-4 py-2">
        <div className="flex items-center text-[#000000c4] font-normal gap-2">
          <TbSettings />
          <p>Settings</p>
        </div>
        <div className="flex items-center text-[#000000b3] mt-3 justify-between">
          <MdOutlineLightMode className="text-xl" />{" "}
          <div className="flex items-center text-[#000000c3] gap-2">
            <FaXTwitter />
            <FaDiscord />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
