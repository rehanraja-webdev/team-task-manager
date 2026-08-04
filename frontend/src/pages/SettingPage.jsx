import NotificationSettings from "../components/settings/NotificationSettings";
import AppearanceSettings from "../components/settings/AppearanceSettings";
import DangerZone from "../components/settings/DangerZone";

const SettingsPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">Settings</h1>

        <p className="mt-2 text-slate-400">
          Customize your application preferences.
        </p>
      </div>

      <NotificationSettings />

      <AppearanceSettings />

      <DangerZone />
    </div>
  );
};

export default SettingsPage;
