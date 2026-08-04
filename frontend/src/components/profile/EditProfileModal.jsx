import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const EditProfileModal = ({ open, onClose, user }) => {
  const { updateProfile, loading } = useAuth();

  const [fullname, setFullname] = useState("");

  useEffect(() => {
    if (user) {
      setFullname(user.fullname);
    }
  }, [user]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fullname.trim() === user.fullname) {
      onClose();
      return;
    }

    const success = await updateProfile({
      fullname: fullname.trim(),
    });

    if (success) {
      onClose();
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={!loading ? onClose : undefined}
      />

      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={!loading ? onClose : undefined}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl"
        >
          <h2 className="mb-6 text-2xl font-semibold text-white">
            Edit Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Full Name
              </label>

              <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                disabled={loading}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={loading}
                onClick={onClose}
                className="rounded-lg px-5 py-2 text-slate-300 hover:bg-slate-800 cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-500 cursor-pointer disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfileModal;
