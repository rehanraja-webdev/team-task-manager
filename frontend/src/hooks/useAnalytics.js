import { useEffect, useState } from "react";
import {
  getAnalyticsOverview,
  getMonthlyTask,
} from "../services/admin.service";
import toast from "react-hot-toast";

const useAnalytics = () => {
  const [overview, setOverview] = useState(null);
  const [monthTasks, setMonthTasks] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [analyticsRes, monthTaskRes] = await Promise.all([
          getAnalyticsOverview(),
          getMonthlyTask(),
        ]);

        setOverview(analyticsRes);
        setMonthTasks(monthTaskRes);
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

  return { overview, monthTasks, fetching };
};
export default useAnalytics;
