import toast from "react-hot-toast";
import { getAllActivity } from "../services/activity.service";
import { useEffect, useState } from "react";

const useActivity = (params) => {
  const [activities, setActivities] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const getActivity = async () => {
      setFetching(true);
      try {
        const activityRes = await getAllActivity(params);
        setActivities(activityRes);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load activities!",
        );
      } finally {
        setFetching(false);
      }
    };

    getActivity();
  }, [params]);

  return { activities, fetching };
};

export default useActivity;
