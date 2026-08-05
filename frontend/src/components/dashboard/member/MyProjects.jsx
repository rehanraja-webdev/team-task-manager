const MyProjects = ({ projects }) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-5 text-xl font-semibold text-white">My Projects</h2>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project._id}
            className="rounded-xl border border-slate-800 bg-slate-950 p-4"
          >
            <h3 className="font-medium text-white">{project.name}</h3>

            <p className="mt-2 text-sm capitalize text-slate-400">
              {project.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProjects;
