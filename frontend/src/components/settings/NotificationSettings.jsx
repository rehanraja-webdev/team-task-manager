import { useEffect, useMemo, useState } from "react";
import ToggleSwitch from "./ToggleSwitch";

const notificationOptions = [
  {
    key: "emailNotifications",
    label: "Email Notifications",
    description: "Receive important updates through email.",
  },
  {
    key: "browserNotifications",
    label: "Browser Notifications",
    description: "Show browser notifications while using TeamTask.",
  },
  {
    key: "taskAssigned",
    label: "Task Assignment",
    description: "Notify me when a task is assigned to me.",
  },
  {
    key: "dueReminder",
    label: "Due Date Reminder",
    description: "Receive reminders before task deadlines.",
  },
  {
    key: "projectUpdates",
    label: "Project Updates",
    description: "Notify me when projects are updated.",
  },
];

const NotificationSettings = ({ settings, saveSettings, saving }) => {
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: false,
    browserNotifications: false,
    taskAssigned: false,
    dueReminder: false,
    projectUpdates: false,
  });

  useEffect(() => {
    if (!settings) return;

    setNotificationSettings({
      emailNotifications: settings.emailNotifications,
      browserNotifications: settings.browserNotifications,
      taskAssigned: settings.taskAssigned,
      dueReminder: settings.dueReminder,
      projectUpdates: settings.projectUpdates,
    });
  }, [settings]);

  const handleToggle = (field, value) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const hasChanges = useMemo(() => {
    if (!settings) return false;

    return notificationOptions.some(
      ({ key }) => settings[key] !== notificationSettings[key],
    );
  }, [settings, notificationSettings]);

  const handleSave = async () => {
    if (!hasChanges) return;

    await saveSettings(notificationSettings);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Notifications</h2>

        <p className="text-slate-400 mt-1">
          Manage how you receive notifications.
        </p>
      </div>

      <div className="divide-y divide-slate-800">
        {notificationOptions.map((option) => (
          <ToggleSwitch
            key={option.key}
            label={option.label}
            description={option.description}
            checked={notificationSettings[option.key]}
            disabled={saving}
            onChange={(value) => handleToggle(option.key, value)}
          />
        ))}
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
            }`}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;
