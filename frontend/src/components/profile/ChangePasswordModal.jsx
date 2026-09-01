import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const ChangePasswordModal = ({ open, onClose }) => {
  const { changePassword, loading } = useAuth();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      return;
    }

    const success = await changePassword({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    });

    if (success) {
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={!loading ? onClose : undefined}
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={!loading ? onClose : undefined}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="
            w-full max-w-md rounded-2xl border p-6 shadow-2xl
            border-slate-200 bg-white
            dark:border-slate-700 dark:bg-slate-900
          "
        >
          <h2 className="mb-6 text-2xl font-semibold text-slate-900 dark:text-white">
            Change Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm text-slate-600 dark:text-slate-400">
                Current Password
              </label>

              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                disabled={loading}
                required
                className="
                  w-full rounded-xl border px-4 py-3 outline-none
                  border-slate-300 bg-slate-50 text-slate-900
                  focus:border-indigo-500
                  dark:border-slate-700 dark:bg-slate-950 dark:text-white
                "
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-600 dark:text-slate-400">
                New Password
              </label>

              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                disabled={loading}
                required
                className="
                  w-full rounded-xl border px-4 py-3 outline-none
                  border-slate-300 bg-slate-50 text-slate-900
                  focus:border-indigo-500
                  dark:border-slate-700 dark:bg-slate-950 dark:text-white
                "
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-600 dark:text-slate-400">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
                required
                className="
                  w-full rounded-xl border px-4 py-3 outline-none
                  border-slate-300 bg-slate-50 text-slate-900
                  focus:border-indigo-500
                  dark:border-slate-700 dark:bg-slate-950 dark:text-white
                "
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={loading}
                onClick={onClose}
                className="
                  cursor-pointer rounded-lg px-5 py-2
                  text-slate-600 hover:bg-slate-100
                  dark:text-slate-300 dark:hover:bg-slate-800
                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={
                  loading ||
                  !formData.currentPassword ||
                  !formData.newPassword ||
                  !formData.confirmPassword
                }
                className="
                  cursor-pointer rounded-lg bg-indigo-600 px-5 py-2
                  text-white hover:bg-indigo-500
                  disabled:cursor-not-allowed disabled:opacity-50
                "
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordModal;
