import { Notifications, AccountCircle } from "@mui/icons-material";
import { Link } from 'react-router-dom';

import SearchBar from "../SearchBar";
export default function DashboardHeader() {
  return (
    <>
      <header className="flex justify-around items-center bg-gray-800 p-4 shadow-md">
        {/* Dashboard Title */}
        <h1 className="text-white text-2xl font-bold">Dashboard</h1>

        {/* Search Bar */}
        <div className="flex items-center bg-gray-900 rounded-lg px-4 py-1 w-1/3">
          <SearchBar />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notification Icon */}
          <div className="relative">
            <Notifications className="text-gray-400 cursor-pointer" />
            <span className="absolute top-0 right-0 bg-orange-500 text-xs w-2.5 h-2.5 rounded-full"></span>
          </div>

          {/* User Avatar and Name */}
          <div className="bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center">
            <Link to='profile' ><AccountCircle className="text-gray-400" /></Link>
          </div>
        </div>
      </header>
    </>
  );
}
