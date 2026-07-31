import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/admin.service";
import toast from "react-hot-toast";

const useDashboard = () => {
  const [stats, setstats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboard = async () => {
      try {
        const statsRes = await getDashboardStats();
        setstats(statsRes);
      } catch (error) {
        toast.error(error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    getDashboard();
  }, []);

  return { stats, loading };
};

export default useDashboard;
