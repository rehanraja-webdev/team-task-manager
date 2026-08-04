import useAuth from "../../hooks/useAuth";

const DangerZone = () => {
  const { logout, loading } = useAuth();

  return (
    <div className="rounded-2xl border border-red-500/30 bg-red-950/20 p-6">
      <h2 className="text-xl font-semibold text-red-400">Danger Zone</h2>

      <p className="mt-2 text-slate-400">Logout from your account.</p>

      <button
        onClick={logout}
        disabled={loading}
        className="mt-6 rounded-xl bg-red-600 px-5 py-3 text-white transition hover:bg-red-500 disabled:opacity-50"
      >
        Logout
      </button>
    </div>
  );
};

export default DangerZone;
