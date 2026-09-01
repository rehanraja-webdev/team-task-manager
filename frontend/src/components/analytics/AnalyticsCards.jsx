import {
  Users,
  FolderKanban,
  ClipboardList,
  AlertTriangle,
} from "lucide-react";
import OverviewCard from "./OverviewCard";

const AnalyticsCards = ({ overview }) => {
  if (!overview) return <p>Loading...</p>;

  const cards = [
    {
      title: "Total Users",
      value: overview.totalMembers,
      icon: Users,
    },
    {
      title: "Projects",
      value: overview.totalProjects,
      icon: FolderKanban,
    },
    {
      title: "Total Tasks",
      value: overview.totalTasks,
      icon: ClipboardList,
    },
    {
      title: "Overdue",
      value: overview.overdueTasks,
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <OverviewCard key={card.title} {...card} />
      ))}
    </div>
  );
};

export default AnalyticsCards;
