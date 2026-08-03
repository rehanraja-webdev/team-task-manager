import { useEffect, useState } from "react";
import {
  getAnalyticsOverview,
  getMonthlyTask,
  getProjectProgress,
} from "../services/admin.service";
import toast from "react-hot-toast";

const useAnalytics = () => {
  const [overview, setOverview] = useState(null);
  const [monthTasks, setMonthTasks] = useState(null);
  const [projectAnalytics, setProjectAnalytics] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [analyticsRes, monthTaskRes, progressRes] = await Promise.all([
          getAnalyticsOverview(),
          getMonthlyTask(),
          getProjectProgress(),
        ]);

        setOverview(analyticsRes);
        setMonthTasks(monthTaskRes);
        setProjectAnalytics(progressRes);
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

  return { overview, monthTasks, projectAnalytics, fetching };
};
export default useAnalytics;
