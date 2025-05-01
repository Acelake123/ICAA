import "./Dashboard.module.css";
import Aside from "./Aside";
import DashboardHeader from "../Components/Header/DashboardHeader";
import { Outlet } from "react-router-dom";

export default function Dashboard() {



  return (
    <div className="flex min-h-screen bg-gray-700 text-white font-sans">
      {/* Sidebar */}
        <Aside />
      {/* Main Content */}
      <main className="flex-1">
       <DashboardHeader />
        {/* Grid Content */}
        <Outlet />
      </main>
    </div>
  );
}
