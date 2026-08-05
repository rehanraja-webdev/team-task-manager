import { useEffect, useState } from "react";
import { search } from "../services/search.service";
import toast from "react-hot-toast";

const EMPTY_RESULTS = {
  users: [],
  projects: [],
  tasks: [],
};

const useSearch = (query) => {
  const [results, setResults] = useState(EMPTY_RESULTS);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  const trimmedQuery = query.trim();

  if (trimmedQuery.length < 2) {
    setResults(EMPTY_RESULTS);
    return;
  }

  const fetchResults = async () => {
    try {
      setLoading(true);

      const data = await search(trimmedQuery);

      setResults(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Search failed");
    } finally {
      setLoading(false);
    }
  };

  fetchResults();
}, [query]);

  return {
    results,
    loading,
  };
};

export default useSearch;
