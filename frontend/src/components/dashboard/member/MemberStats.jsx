import {
  ClipboardList,
  CircleCheckBig,
  Clock3,
  CalendarClock,
} from "lucide-react";

const MemberStats = ({ dashboard }) => {
  const cards = [
    {
      title: "Assigned",
      value: dashboard.assignedTasks,
      icon: ClipboardList,
    },
    {
      title: "Completed",
      value: dashboard.completedTasks,
      icon: CircleCheckBig,
    },
    {
      title: "In Progress",
      value: dashboard.inProgressTasks,
      icon: Clock3,
    },
    {
      title: "Due Today",
      value: dashboard.dueToday,
      icon: CalendarClock,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">{card.title}</p>

                <h2 className="mt-2 text-3xl font-bold text-white">
                  {card.value}
                </h2>
              </div>

              <div className="rounded-xl bg-indigo-500/20 p-3">
                <Icon className="text-indigo-400" size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MemberStats;
