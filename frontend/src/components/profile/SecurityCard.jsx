import { Lock, KeyRound } from "lucide-react";
import { useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";

const SecurityCard = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Security
            </h2>

            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Keep your account secure by updating your password regularly.
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
          >
            <KeyRound size={16} />
            Change Password
          </button>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-indigo-500/20 p-2">
              <Lock
                className="text-indigo-600 dark:text-indigo-400"
                size={18}
              />
            </div>

            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Password
              </p>

              <p className="mt-1 text-lg tracking-[0.35em] text-slate-900 dark:text-white">
                ••••••••••••
              </p>
            </div>
          </div>
        </div>
      </div>

      <ChangePasswordModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default SecurityCard;
