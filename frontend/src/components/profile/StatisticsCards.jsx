import {
  FolderKanban,
  ClipboardList,
  CircleCheckBig,
  TrendingUp,
} from "lucide-react";

const StatisticsCards = ({ statistics }) => {
  const stats = [
    {
      title: "Projects",
      value: statistics.projectsCount,
      icon: FolderKanban,
    },
    {
      title: "Assigned Tasks",
      value: statistics.assignedTasks,
      icon: ClipboardList,
    },
    {
      title: "Completed",
      value: statistics.completedTasks,
      icon: CircleCheckBig,
    },
    {
      title: "Completion",
      value: `${statistics.completionRate}%`,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-indigo-500 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {item.title}
                </p>

                <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                  {item.value}
                </h3>
              </div>

              <div className="rounded-xl bg-indigo-500/20 p-3">
                <Icon
                  className="text-indigo-600 dark:text-indigo-400"
                  size={28}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatisticsCards;
