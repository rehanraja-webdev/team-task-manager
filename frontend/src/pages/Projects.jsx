import ProjectCard from "../components/common/ProjectCard";
import useProjects from "../hooks/useProjects";

const Projects = () => {
  const { projects, loading } = useProjects();

  if (projects.length === 0) {
    return <p>No projects found.</p>;
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white">Projects</h1>

          <p className="text-slate-400 mt-2">
            Manage all your projects in one place.
          </p>
        </div>

        <button className="bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded-xl text-white">
          + New Project
        </button>
      </div>

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

      <div className="grid xl:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
