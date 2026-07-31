import toast from "react-hot-toast";
import { getAllActivity } from "../services/activity.service";
import { useEffect, useState } from "react";

const useActivity = () => {
  const [activities, setActivities] = useState(null);
  const [fetching, setFetching] = useState(true);
  const getActivity = async () => {
    try {
      const activityRes = await getAllActivity();
      setActivities(activityRes);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load activities!",
      );
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    getActivity();
  }, []);

  return { activities, fetching };
};

export default useActivity;
