import useSettings from "../hooks/useSettings";

import AppearanceSettings from "../components/settings/AppearanceSettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import DangerZone from "../components/settings/DangerZone";

const SettingsPage = () => {
  const { settings, loading, saving, saveSettings } = useSettings();

  if (loading) {
    return (
      <div className="text-center text-slate-400 py-20">
        Loading Settings...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <AppearanceSettings
        settings={settings}
        saving={saving}
        saveSettings={saveSettings}
      />

      <NotificationSettings
        settings={settings}
        saving={saving}
        saveSettings={saveSettings}
      />

      <DangerZone />
    </div>
  );
};

export default SettingsPage;
