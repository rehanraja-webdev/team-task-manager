import { useEffect, useState } from "react";
import { getMemberDashboard } from "../services/dashboard.service";
import toast from "react-hot-toast";

const useMemberDashboard = () => {
  const [memberStats, setMemberStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboard = async () => {
      try {
        const statsRes = await getMemberDashboard();
        setMemberStats(statsRes);
      } catch (error) {
        toast.error(error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    getDashboard();
  }, []);

  return { memberStats, loading };
};

export default useMemberDashboard;
