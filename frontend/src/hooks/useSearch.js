import { useEffect, useState } from "react";
import { search } from "../services/search.service";
import toast from "react-hot-toast";

const useSearch = (query) => {
  const EMPTY_RESULTS = {
    users: [],
    projects: [],
    tasks: [],
  };

  const [results, setResults] = useState(EMPTY_RESULTS);

  const [loading, setLoading] = useState(false);
  const trimmedQuery = query.trim();

  useEffect(() => {
    if (trimmedQuery.length < 2) {
      setResults(EMPTY_RESULTS);
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
