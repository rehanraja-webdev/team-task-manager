import { useEffect, useState } from "react";
import { Check, Monitor, Moon, Sun } from "lucide-react";

const themes = [
  {
    value: "dark",
    title: "Dark",
    description: "Dark appearance for low-light environments.",
    icon: Moon,
  },
  {
    value: "light",
    title: "Light",
    description: "Bright appearance for daytime use.",
    icon: Sun,
  },
  {
    value: "system",
    title: "System",
    description: "Automatically match your device settings.",
    icon: Monitor,
  },
];

const AppearanceSettings = ({ settings, saveSettings, saving }) => {
  const [selectedTheme, setSelectedTheme] = useState("dark");

  useEffect(() => {
    if (settings) {
      setSelectedTheme(settings.theme);
    }
  }, [settings]);

  const hasChanges = selectedTheme !== settings?.theme;

  const handleSave = async () => {
    if (!hasChanges) return;

    await saveSettings({
      theme: selectedTheme,
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Appearance</h2>

        <p className="text-slate-400 mt-1">Customize how TeamTask looks.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {themes.map((theme) => {
          const Icon = theme.icon;

          const active = selectedTheme === theme.value;

          return (
            <button
              key={theme.value}
              type="button"
              onClick={() => setSelectedTheme(theme.value)}
              className={`relative rounded-2xl border p-5 transition-all text-left cursor-pointer
                ${
                  active
                    ? "border-indigo-500 bg-indigo-500/10"
                    : "border-slate-800 hover:border-slate-700 bg-slate-950"
                }
              `}
            >
              {active && (
                <div className="absolute top-4 right-4 bg-indigo-600 rounded-full p-1">
                  <Check size={14} className="text-white" />
                </div>
              )}

              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-4">
                <Icon className="text-white" size={22} />
              </div>

              <h3 className="text-white font-semibold">{theme.title}</h3>

              <p className="text-sm text-slate-400 mt-2">{theme.description}</p>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={handleSave}
          disabled={!hasChanges || saving}
          className={`px-6 py-3 rounded-xl font-medium transition-all
            ${
              hasChanges
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "bg-slate-800 text-slate-500 cursor-not-allowed"
            }
          `}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default AppearanceSettings;
