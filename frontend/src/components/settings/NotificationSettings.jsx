import { useEffect, useState } from "react";

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    email: true,
    browser: true,
    activity: true,
  });

  useEffect(() => {
    const saved = localStorage.getItem("notification-settings");

    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notification-settings", JSON.stringify(settings));
  }, [settings]);

  const handleChange = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-semibold text-white">Notifications</h2>

      <div className="mt-6 space-y-5">
        {[
          ["email", "Email Notifications"],
          ["browser", "Browser Notifications"],
          ["activity", "Activity Log"],
        ].map(([key, label]) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-slate-300">{label}</span>

            <input
              type="checkbox"
              checked={settings[key]}
              onChange={() => handleChange(key)}
              className="h-5 w-5 cursor-pointer accent-indigo-600"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationSettings;
