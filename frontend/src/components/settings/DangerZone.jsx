
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { LogOut } from "lucide-react";

const DangerZone = () => {
  const { logout, loading } = useAuth();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsConfirmOpen(false);
    }
  };

  return (
    <>
      {/* Danger Zone Card */}
      <div className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm backdrop-blur-sm dark:border-red-500/20 dark:bg-red-950/10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-red-600 dark:text-red-400">
              <LogOut size={20} />
              Log Out
            </h2>

            <p className="text-sm text-slate-600 dark:text-slate-400">
              Sign out of your account on this device.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsConfirmOpen(true)}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isConfirmOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm dark:bg-black/70"
          role="dialog"
          aria-modal="true"
          aria-labelledby="logout-modal-title"
        >
          <div className="w-full max-w-md space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
            <h3
              id="logout-modal-title"
              className="text-lg font-semibold text-slate-900 dark:text-slate-100"
            >
              Confirm Log Out
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-400">
              Are you sure you want to log out? You will need to sign back in
              to access your projects and tasks.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsConfirmOpen(false)}
                disabled={loading}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleLogout}
                disabled={loading}
                aria-busy={loading}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <LogOut size={16} />
                {loading ? "Logging Out..." : "Log Out"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DangerZone;
