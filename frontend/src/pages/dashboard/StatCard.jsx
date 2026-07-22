import { MoveUpRight } from "lucide-react";

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-400">{title}</p>

          <h2 className="text-4xl font-bold text-white mt-2">{value}</h2>
        </div>

        <div className="flex flex-col items-center">
          <span className="flex justify-center items-center border-2 border-indigo-400 p-1 rounded-full w-9 h-9">
            <MoveUpRight className="text-white p-0.5" />
          </span>

          <div className="text-indigo-400 mt-2">{icon}</div>
        </div>
      </div>
    </div>
  );
};
export default StatCard;
