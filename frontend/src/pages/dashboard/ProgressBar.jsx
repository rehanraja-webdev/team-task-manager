const ProgressBar = ({ title, value = 0, total = 0 }) => {
  const percentage = total ? Math.round((value / total) * 100) : 0;

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-slate-300">{title}</span>

        <span className="text-slate-400">{percentage}%</span>
      </div>

      <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-500"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
