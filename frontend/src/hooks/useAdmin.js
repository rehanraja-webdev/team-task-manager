import toast from "react-hot-toast";
import { getAllUsers } from "../services/admin.service";
import { useEffect, useState } from "react";

const useAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersRes = await getAllUsers();
        setUsers(usersRes || []);
      } catch (error) {
        toast.error(error.response?.data.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return { users, loading };
};
export default useAdmin;
