const OverviewCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-indigo-500/40">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-white">{value ?? 0}</h2>
        </div>

        <div className="rounded-xl bg-indigo-500/10 p-3">
          <Icon size={28} className="text-indigo-400" />
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
