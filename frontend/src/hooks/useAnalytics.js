import { useEffect, useState } from "react";
import { getAnalytics } from "../services/admin.service";
import toast from "react-hot-toast";

const useAnalytics = () => {
  const [data, setData] = useState({
    overview: null,
    monthTasks: [],
    projectAnalytics: [],
    contributors: [],
    overdue: [],
  });

  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const analytics = await getAnalytics();
        setData(analytics);
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

  return { ...data, fetching };
};

export default useAnalytics;
