const ProjectModal = ({
  modalActive,
  onSubmit,
  formData,
  setFormData,
  onClose,
  loading,
}) => {
  if (!modalActive) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm p-6 bg-slate-800 border border-slate-700/80 rounded-2xl shadow-2xl text-white transform transition-all">
          <h3 className="text-lg font-semibold text-slate-100 mb-4">
            Update Project
          </h3>

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-2">
                Project Name
              </label>

              <input
                type="text"
                name="name"
                value={formData?.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g. E-Commerce Dashboard"
                className="w-full bg-slate-900/80 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={formData?.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Briefly describe the goals and scope of this project..."
                rows={4}
                className="w-full bg-slate-900/80 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none transition resize-none"
                required
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                disabled={loading}
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700/60 rounded-lg transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-md shadow-indigo-600/20 transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
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

export default ProjectModal;
