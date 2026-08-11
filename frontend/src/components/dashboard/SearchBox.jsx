import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useSearch from "../../hooks/useSearch";
import SearchDropdown from "./SearchDropdown";
import useDebounce from "../../hooks/useDebounce";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const debouncedQuery = useDebounce(query, 300);
  const { results, loading } = useSearch(debouncedQuery);

  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setFocused(false);
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeSearch = () => {
    setFocused(false);
    setMobileOpen(false);
    setQuery("");
  };

  return (
    <>
      {/* Desktop */}
      <div ref={wrapperRef} className="relative hidden w-80 md:block">
        <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
          <Search size={18} className="text-slate-600 dark:text-slate-400" />

          <input
            type="text"
            placeholder="Search..."
            value={query}
            onFocus={() => setFocused(true)}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
          />
        </div>

        {focused && query.trim() && (
          <SearchDropdown
            query={query}
            results={results}
            loading={loading}
            onClose={closeSearch}
          />
        )}
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="cursor-pointer rounded-full bg-slate-100 p-3 dark:bg-slate-900"
          aria-label="Open search"
        >
          <Search className="text-slate-700 dark:text-slate-300" size={20} />
        </button>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 bg-slate-100 p-4 dark:bg-slate-950">
            <div ref={wrapperRef} className="relative">
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
                <Search
                  size={18}
                  className="text-slate-600 dark:text-slate-400"
                />

                <input
                  autoFocus
                  value={query}
                  onFocus={() => setFocused(true)}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="flex-1 bg-transparent text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
                />

                <button
                  onClick={closeSearch}
                  className="cursor-pointer"
                  aria-label="Close search"
                >
                  <X className="text-slate-600 dark:text-slate-400" />
                </button>
              </div>

              {focused && query.trim() && (
                <SearchDropdown
                  query={query}
                  results={results}
                  loading={loading}
                  onClose={closeSearch}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBox;
