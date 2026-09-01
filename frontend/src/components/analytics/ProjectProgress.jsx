import ProgressBar from "./ProgressBar";

const ProjectProgress = ({ data = [] }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">
        Project Progress
      </h2>

      {data.length === 0 ? (
        <p className="py-6 text-center text-slate-500 dark:text-slate-400">
          No project data available.
        </p>
      ) : (
        <div className="space-y-5">
          {data.map((project) => (
            <div key={project.project}>
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-white">
                    {project.project}
                  </h3>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {project.tasks} Tasks
                  </p>
                </div>

                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  {project.completionRate}%
                </span>
              </div>

              <ProgressBar value={project.completionRate} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectProgress;
