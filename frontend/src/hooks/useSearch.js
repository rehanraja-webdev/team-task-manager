import { useEffect, useState } from "react";
import { search } from "../services/search.service";
import toast from "react-hot-toast";

const useSearch = (query) => {
  const [results, setResults] = useState({
    users: [],
    projects: [],
    tasks: [],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults({
        users: [],
        projects: [],
        tasks: [],
      });
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);

        const data = await search(query);

        setResults(data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Search failed");
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => clearTimeout(timeout);
  }, [query]);

  return {
    results,
    loading,
  };
};

export default useSearch;
