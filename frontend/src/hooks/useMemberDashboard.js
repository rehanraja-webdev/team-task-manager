import { useEffect, useState } from "react";
import { getMemberDashboard } from "../services/dashboard.service";
import toast from "react-hot-toast";

const useMemberDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const getDashboard = async () => {
      try {
        const statsRes = await getMemberDashboard();
        setDashboard(statsRes);
      } catch (error) {
        toast.error(error.response?.data?.message);
      } finally {
        setFetching(false);
      }
    };

    getDashboard();
  }, []);

  return { dashboard, fetching };
};

export default useMemberDashboard;
