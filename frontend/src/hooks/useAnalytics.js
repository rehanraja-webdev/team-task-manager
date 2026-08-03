import { useEffect, useState } from "react";
import {
  getAnalyticsOverview,
  getMonthlyTask,
  getOverdueTasks,
  getProjectProgress,
  getTopContributors,
} from "../services/admin.service";
import toast from "react-hot-toast";

const useAnalytics = () => {
  const [overview, setOverview] = useState(null);
  const [monthTasks, setMonthTasks] = useState(null);
  const [projectAnalytics, setProjectAnalytics] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [overdue, setOverdue] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [
          analyticsRes,
          monthTaskRes,
          progressRes,
          contributorsRes,
          overdueRes,
        ] = await Promise.all([
          getAnalyticsOverview(),
          getMonthlyTask(),
          getProjectProgress(),
          getTopContributors(),
          getOverdueTasks(),
        ]);

        setOverview(analyticsRes);
        setMonthTasks(monthTaskRes);
        setProjectAnalytics(progressRes);
        setContributors(contributorsRes);
        setOverdue(overdueRes);
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

  return {
    overview,
    monthTasks,
    projectAnalytics,
    contributors,
    overdue,
    fetching,
  };
};
export default useAnalytics;
