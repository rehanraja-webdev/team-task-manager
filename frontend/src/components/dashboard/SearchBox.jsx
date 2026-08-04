import { Search } from "lucide-react";
import { useState } from "react";
import useSearch from "../../hooks/useSearch";
import SearchDropdown from "./SearchDropdown";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const { results, loading } = useSearch(query);

  return (
    <div className="relative md:w-80 w-56">
      <div className="flex items-center gap-3 rounded-full border border-slate-800 bg-slate-950 px-4 py-3">
        <Search size={18} className="text-slate-400" />

        <input
          type="text"
          placeholder="Search..."
          value={query}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent text-white outline-none"
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
  );
};

export default SearchBox;
