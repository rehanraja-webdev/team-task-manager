import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getStatistics } from "../services/auth.service";

const useUserStatistics = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStatistics = async () => {
    try {
      const response = await getStatistics();
      setStatistics(response);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch user statistics",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    fetchStatistics();
  }, []);

  return {
    statistics,
    loading,
    reloadStatistics: fetchStatistics,
  };
};

export default useUserStatistics;
