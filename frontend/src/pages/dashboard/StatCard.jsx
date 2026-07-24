const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-400">{title}</p>

          <h2 className="text-4xl font-bold text-white mt-2">{value}</h2>
        </div>

        <div className="text-indigo-400 mt-2">{icon}</div>
      </div>
    </div>
  );
};
export default StatCard;
