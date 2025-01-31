import React from "react";
import { Route, Routes } from "react-router-dom"; // Use Routes instead of Switch
import Sidebar from "../components/Sidebar";
import Home from "./Home";
import Tasks from "./Tasks";
import Agents from "./Agents";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto ml-64 pt-16">
        <header className="fixed top-0 left-0 right-0 flex items-center justify-between w-full px-4 py-2 bg-white border-b-[.5px] border-[#E2E8F0] z-10">
          <p className="text-[1.25rem] font-semibold text-center flex-1">
            Orbit
          </p>
          <button className="px-3 py-2 bg-blue-500 rounded-sm text-white font-semibold">
            Login
          </button>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/agents" element={<Agents />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
