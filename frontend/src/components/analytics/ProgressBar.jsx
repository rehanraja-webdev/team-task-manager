const ProgressBar = ({ value }) => {
  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-slate-700">
      <div
        style={{ width: `${value}%` }}
        className="h-full rounded-full bg-indigo-500 transition-all duration-700"
      />
    </div>
  );
};

export default ProgressBar;
