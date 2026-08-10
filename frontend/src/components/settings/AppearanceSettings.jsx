import { useEffect } from "react";
import { Check } from "lucide-react";
import useTheme from "../../hooks/useTheme";
import { themes } from "../../constants/theme";

const AppearanceSettings = ({ settings, saveSettings, saving }) => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (settings?.theme) {
      setTheme(settings.theme);
    }
  }, [settings, setTheme]);

  const hasChanges = theme !== settings?.theme;

  const handleSave = async () => {
    if (!hasChanges || saving) return;

    await saveSettings({ theme });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Appearance
        </h2>

        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Customize how TeamTask looks.
        </p>
      </div>

      {/* Themes */}
      <div className="grid gap-5 md:grid-cols-3">
        {themes.map((item) => {
          const Icon = item.icon;
          const active = theme === item.value;

          return (
            <button
              key={item.value}
              type="button"
              disabled={saving}
              onClick={() => setTheme(item.value)}
              className={`relative rounded-2xl border p-5 text-left transition-all duration-200 ${
                saving ? "cursor-not-allowed opacity-70" : "cursor-pointer"
              } ${
                active
                  ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10"
                  : "border-slate-200 bg-slate-50 hover:-translate-y-1 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700"
              }`}
            >
              {/* Selected indicator */}
              {active && (
                <div className="absolute right-4 top-4 rounded-full bg-indigo-600 p-1">
                  <Check size={14} className="text-white" />
                </div>
              )}

              {/* Icon */}
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${
                  active ? "bg-indigo-600" : "bg-slate-200 dark:bg-slate-800"
                }`}
              >
                <Icon
                  size={22}
                  className={
                    active ? "text-white" : "text-slate-700 dark:text-slate-200"
                  }
                />
              </div>

              {/* Title */}
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                {item.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Save */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={!hasChanges || saving}
          className={`rounded-xl px-6 py-3 font-medium transition-all ${
            hasChanges && !saving
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "cursor-not-allowed bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-500"
          }`}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default AppearanceSettings;
