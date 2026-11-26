import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getSettings, updateSettings } from "../services/settings.service";

const useSettings = () => {
  const [settings, setSettings] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getSettings();

      setSettings(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load settings");
    } finally {
      setLoading(false);
    }
  }, []);

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
    let cancelled = false;

    const loadSettings = async () => {
      try {
        const data = await getSettings();
        if (!cancelled) {
          setSettings(data);
        }
      } catch (error) {
        if (!cancelled) {
          toast.error(
            error.response?.data?.message || "Failed to load settings",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadSettings();

    return () => {
      cancelled = true;
    };
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
