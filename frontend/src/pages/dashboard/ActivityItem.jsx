const ActivityItem = ({ text, time }) => {
  return (
    <div className="border-l-2 border-indigo-500 pl-4">
      <p className="text-slate-200">{text}</p>

      <span className="text-slate-500 text-sm">{time}</span>
    </div>
  );
};

export default ActivityItem;
