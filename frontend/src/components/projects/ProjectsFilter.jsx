const ProjectsFilter = () => {
  return (
    <div className="flex gap-4">
      <input
        type="text"
        placeholder="Search projects..."
        className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white flex-1"
      />

      <select className="bg-slate-900 border border-slate-800 rounded-xl px-4 text-white">
        <option>All Status</option>
        <option>Active</option>
        <option>Completed</option>
      </select>
    </div>
  );
};

export default ProjectsFilter;
