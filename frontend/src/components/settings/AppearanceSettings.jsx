import { useEffect, useState } from "react";

const AppearanceSettings = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-semibold text-white">Appearance</h2>

      <div className="mt-6 space-y-3">
        {["system", "light", "dark"].map((mode) => (
          <label
            key={mode}
            className="flex cursor-pointer items-center gap-3 text-slate-300"
          >
            <input
              type="radio"
              value={mode}
              checked={theme === mode}
              onChange={() => setTheme(mode)}
            />

            <span className="capitalize">{mode}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default AppearanceSettings;
