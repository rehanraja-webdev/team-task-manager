import { useEffect, useState } from "react";
import { getAnalyticsOverview } from "../services/admin.service";
import toast from "react-hot-toast";

const useAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const analyticsRes = await getAnalyticsOverview();
        setAnalytics(analyticsRes);
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

  return { analytics, fetching };
};
export default useAnalytics;
