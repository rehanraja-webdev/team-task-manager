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
        onClick={!loading ? onClose : undefined}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          onClick={(e) => e.stopPropagation()}
          className="
            w-full max-w-sm rounded-2xl p-6 shadow-2xl
            bg-white dark:bg-slate-900
            border border-slate-200 dark:border-slate-800
            text-slate-900 dark:text-white
          "
        >
          <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
            Update Project
          </h3>

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
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
                className="
                  w-full rounded-xl px-4 py-3 text-sm outline-none transition
                  bg-slate-50 dark:bg-slate-950
                  border border-slate-200 dark:border-slate-700
                  text-slate-900 dark:text-slate-200
                  placeholder-slate-400 dark:placeholder-slate-500
                  focus:border-indigo-500
                  focus:ring-2 focus:ring-indigo-500/20
                "
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
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
                className="
                  w-full resize-none rounded-xl px-4 py-3 text-sm outline-none transition
                  bg-slate-50 dark:bg-slate-950
                  border border-slate-200 dark:border-slate-700
                  text-slate-900 dark:text-slate-200
                  placeholder-slate-400 dark:placeholder-slate-500
                  focus:border-indigo-500
                  focus:ring-2 focus:ring-indigo-500/20
                "
                required
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={loading}
                onClick={onClose}
                className="
                  rounded-lg px-4 py-2 text-sm font-medium transition
                  text-slate-600 dark:text-slate-300
                  hover:bg-slate-100 dark:hover:bg-slate-800
                  hover:text-slate-900 dark:hover:text-white
                  disabled:cursor-not-allowed disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="
                  rounded-lg px-4 py-2 text-sm font-medium text-white
                  bg-indigo-600 hover:bg-indigo-500
                  active:bg-indigo-700
                  shadow-md shadow-indigo-600/20
                  transition
                  disabled:cursor-not-allowed disabled:opacity-50
                "
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
