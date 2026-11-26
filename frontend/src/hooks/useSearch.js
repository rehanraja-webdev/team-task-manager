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

  const trimmedQuery = query.trim();

  useEffect(() => {
    if (trimmedQuery.length < 2) {
      return;
    }

    let cancelled = false;

    const fetchResults = async () => {
      try {
        setLoading(true);

        const data = await search(trimmedQuery);

        if (!cancelled) {
          setResults(data);
        }
      } catch (error) {
        if (!cancelled) {
          toast.error(error.response?.data?.message || "Search failed");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchResults();

    return () => {
      cancelled = true;
    };
  }, [trimmedQuery]);

  return {
    results: trimmedQuery.length < 2 ? EMPTY_RESULTS : results,
    loading: trimmedQuery.length < 2 ? false : loading,
  };
};

export default useSearch;
