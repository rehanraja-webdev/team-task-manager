const OverviewItem = ({ label, value }) => {
  return (
    <div className="flex justify-between items-center bg-slate-950 p-4 rounded-xl">
      <span className="text-slate-400">{label}</span>

      <span className="text-white font-semibold">{value}</span>
    </div>
  );
};
export default OverviewItem;
