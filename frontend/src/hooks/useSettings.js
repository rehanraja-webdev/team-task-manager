import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getSettings, updateSettings } from "../services/settings.service";

const useSettings = () => {
  const [settings, setSettings] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const fetchSettings = async () => {
    try {
      setLoading(true);

      const data = await getSettings();

      setSettings(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async (payload) => {
    try {
      setSaving(true);

      const updated = await updateSettings(payload);

      setSettings(updated);

      toast.success("Settings updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    settings,
    loading,
    saving,
    saveSettings,
    refetch: fetchSettings,
  };
};

export default useSettings;
