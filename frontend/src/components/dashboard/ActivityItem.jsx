import { useEffect } from "react";
import api from "../../api/axios";

const ActivityItem = ({ text, time }) => {
  useEffect(() => {
    // const ActivityData = async () => {
    //   const response = await api.get("")
    // }
  })
  return (
    <div className="border-l-2 border-indigo-500 pl-4">
      <p className="text-slate-200">{text}</p>

      <span className="text-slate-500 text-sm">{time}</span>
    </div>
  );
};

export default ActivityItem;
