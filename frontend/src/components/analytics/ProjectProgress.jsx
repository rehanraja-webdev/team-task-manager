import ProgressBar from "./ProgressBar";

const ProjectProgress = ({ data = [] }) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Project Progress
      </h2>

      <div className="space-y-5">
        {data.map((project) => (
          <div key={project.project}>
            <div className="mb-2 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white">{project.project}</h3>

                <p className="text-sm text-slate-400">{project.tasks} Tasks</p>
              </div>

              <span className="font-semibold text-indigo-400">
                {project.completionRate}%
              </span>
            </div>

            <ProgressBar value={project.completionRate} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectProgress;
