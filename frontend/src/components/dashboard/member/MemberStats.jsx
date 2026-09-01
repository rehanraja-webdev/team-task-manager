import {
  ClipboardList,
  CircleCheckBig,
  Clock3,
  CalendarClock,
} from "lucide-react";
import StatCard from "../../common/StatCard";

const MemberStats = ({ dashboard }) => {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 mb-8">
      <StatCard
        title="Assigned"
        value={dashboard?.assignedTasks ?? 0}
        icon={<ClipboardList />}
      />

      <StatCard
        title="Completed"
        value={dashboard?.completedTasks ?? 0}
        icon={<CircleCheckBig />}
      />
      <StatCard
        title="In Progress"
        value={dashboard?.inProgressTasks ?? 0}
        icon={<Clock3 />}
      />
      <StatCard
        title="Due Today"
        value={dashboard?.dueToday ?? 0}
        icon={<CalendarClock />}
      />
    </div>
  );
};

export default MemberStats;
