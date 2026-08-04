import { useEffect, useState } from "react";
import { getAdminDashboard } from "../services/dashboard.service";
import toast from "react-hot-toast";

const useAdminDashboard = () => {
  const [stats, setstats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboard = async () => {
      try {
        const statsRes = await getAdminDashboard();
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

export default useAdminDashboard;
