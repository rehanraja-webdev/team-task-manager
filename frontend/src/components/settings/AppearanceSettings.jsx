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
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Appearance</h2>

        <p className="text-slate-400 mt-1">Customize how TeamTask looks.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {themes.map((item) => {
          const Icon = item.icon;
          const active = theme === item.value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => setTheme(item.value)}
              className={`relative rounded-2xl border p-5 text-left transition-all duration-200 cursor-pointer
                ${
                  active
                    ? "border-indigo-500 bg-indigo-500/10"
                    : "border-slate-800 bg-slate-950 hover:border-slate-700 hover:-translate-y-1"
                }`}
            >
              {active && (
                <div className="absolute top-4 right-4 rounded-full bg-indigo-600 p-1">
                  <Check size={14} className="text-white" />
                </div>
              )}

              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl
                  ${active ? "bg-indigo-600" : "bg-slate-800"}`}
              >
                <Icon className="text-white" size={22} />
              </div>

              <h3 className="font-semibold text-white">{item.title}</h3>

              <p className="mt-2 text-sm text-slate-400">{item.description}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={!hasChanges || saving}
          className={`rounded-xl px-6 py-3 font-medium transition-all
            ${
              hasChanges && !saving
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "cursor-not-allowed bg-slate-800 text-slate-500"
            }`}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default AppearanceSettings;
