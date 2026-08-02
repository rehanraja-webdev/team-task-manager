import { useEffect, useState } from "react";
import { getAnalyticsOverview, getTasksStats } from "../services/admin.service";
import toast from "react-hot-toast";

const useAnalytics = () => {
  const [overview, setOverview] = useState(null);
  const [taskStats, setTaskStats] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [analyticsRes, taskStatsRes] = await Promise.all([
          getAnalyticsOverview(),
          getTasksStats(),
        ]);

        setOverview(analyticsRes);
        setTaskStats(taskStatsRes);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load analytics!",
        );
      } finally {
        setFetching(false);
      }
    };

    fetchAnalytics();
  }, []);

  return { overview, taskStats, fetching };
};
export default useAnalytics;
