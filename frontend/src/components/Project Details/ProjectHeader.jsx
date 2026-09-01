const ProjectHeader = () => {
  return (
    <div className="flex flex-col gap-1.5 pb-6 border-b border-slate-200 dark:border-slate-800">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        Project{" "}
        <span className="text-purple-600 dark:text-purple-500">Details</span>
      </h1>
      <p className="text-base text-slate-600 dark:text-slate-400">
        Here you can see details about the project.
      </p>
    </div>
  );
};

export default ProjectHeader;
