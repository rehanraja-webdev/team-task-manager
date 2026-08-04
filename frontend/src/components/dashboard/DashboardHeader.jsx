import { Bell, Mail, Search } from "lucide-react";

import profileImg from "../../assets/profile.png";

const DashboardHeader = () => {
  return (
    <>
      <div className="flex justify-between items-center bg-slate-900 rounded-2xl p-4 border border-slate-800 mb-8">
        <div className="flex items-center gap-3 bg-slate-950 px-4 py-3 rounded-full border border-slate-800 md:w-80 w-52">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-white w-full"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-slate-950 p-3 rounded-full cursor-pointer">
            <Mail className="text-slate-300" />
          </div>

          <div className="bg-slate-950 p-3 rounded-full cursor-pointer">
            <Bell className="text-slate-300" />
          </div>

          <img
            src={profileImg}
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>
      <div className="mb-8 ml-6">
        <h1 className="text-4xl font-bold text-white">Dashboard</h1>

        <p className="text-slate-400 mt-2">
          Track projects, tasks and team performance.
        </p>
      </div>
    </>
  );
};

export default DashboardHeader;
