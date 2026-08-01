import ActivityHeader from "../components/activity/ActivityHeader";
import ActivityFilters from "../components/activity/ActivityFilters";
import ActivityList from "../components/activity/ActivityList";
import { useState } from "react";
import useActivity from "../hooks/useActivity";
import LoadingSpinner from "../components/common/LoadingSpinner";

const ActivityPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    search: "",
    selected: "all",
  });

  const [page, setPage] = useState(1);
  const params = {
    page,
    limit: 20,
  };

  const queryParams = new URLSearchParams(params).toString();
  const { activities, fetching } = useActivity(queryParams);

  if (fetching) return <LoadingSpinner />;
  return (
    <div className="space-y-6">
      <ActivityHeader />

      <ActivityFilters
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      />

      <ActivityList
        activities={activities}
        setPage={setPage}
        filter={filter}
      />
    </div>
  );
};

export default ActivityPage;
