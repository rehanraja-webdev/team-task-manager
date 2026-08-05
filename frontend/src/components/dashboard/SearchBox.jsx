import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useSearch from "../../hooks/useSearch";
import SearchDropdown from "./SearchDropdown";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { results, loading } = useSearch(query);

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

  return (
    <>
      {/* Desktop */}

      <div ref={wrapperRef} className="relative hidden md:block w-80">
        <div className="flex items-center gap-3 rounded-full border border-slate-800 bg-slate-950 px-4 py-3">
          <Search size={18} className="text-slate-400" />

          <input
            type="text"
            placeholder="Search..."
            value={query}
            onFocus={() => setFocused(true)}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent outline-none text-white"
          />
        </div>

        {focused && query.trim() && (
          <SearchDropdown
            results={results}
            loading={loading}
            onClose={() => {
              setFocused(false);
              setQuery("");
            }}
          />
        )}
      </div>

      {/* Mobile */}

      <div className="md:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="bg-slate-950 p-3 rounded-full"
        >
          <Search className="text-slate-300" />
        </button>

        {mobileOpen && (
          <div className="fixed inset-0 bg-slate-950 z-50 p-4">
            <div ref={wrapperRef} className="relative">
              <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
                <Search size={18} className="text-slate-400" />

                <input
                  autoFocus
                  value={query}
                  onFocus={() => setFocused(true)}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="flex-1 bg-transparent outline-none text-white"
                />

                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setFocused(false);
                    setQuery("");
                  }}
                >
                  <X className="text-slate-400" />
                </button>
              </div>

              {focused && query.trim() && (
                <SearchDropdown
                  results={results}
                  loading={loading}
                  onClose={() => {
                    setFocused(false);
                    setQuery("");
                  }}
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
