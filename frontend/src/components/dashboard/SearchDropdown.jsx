import { FolderOpen, ClipboardList, User } from "lucide-react";
import { Link } from "react-router-dom";

const SearchDropdown = ({ query, results, loading, onClose }) => {
  if (query.trim().length > 0 && query.trim().length < 2) {
    return (
      <div className="absolute top-14 left-0 w-full rounded-xl border border-slate-700 bg-slate-900 shadow-xl z-50 p-4 text-slate-400 text-sm">
        Type at least 2 characters to search.
      </div>
    );
  }
  
  if (loading) {
    return (
      <div className="absolute top-14 left-0 w-full rounded-xl border border-slate-700 bg-slate-900 shadow-xl z-50">
        <p className="p-4 text-sm text-slate-400">Searching...</p>
      </div>
    );
  }

  const { users = [], projects = [], tasks = [] } = results;

  const hasResults = users.length || projects.length || tasks.length;

  if (!hasResults) {
    return (
      <div className="absolute top-14 left-0 w-full rounded-xl border border-slate-700 bg-slate-900 shadow-xl z-50">
        <p className="p-4 text-sm text-slate-400">No results found.</p>
      </div>
    );
  }

  return (
    <div className="absolute top-14 left-0 w-full overflow-hidden text-white rounded-xl border border-slate-700 bg-slate-900 shadow-2xl z-50">
      {projects.length > 0 && (
        <>
          <p className="px-4 py-2 text-xs uppercase text-slate-500 font-bold">
            Projects
          </p>

          {projects.map((project) => (
            <Link
              key={project._id}
              to={`/dashboard/projects/${project._id}`}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 transition"
            >
              <FolderOpen size={18} />
              <span>{project.name}</span>
            </Link>
          ))}
        </>
      )}

      {tasks.length > 0 && (
        <>
          <p className="px-4 py-2 text-xs uppercase text-slate-500 font-bold">
            Tasks
          </p>

          {tasks.map((task) => (
            <Link
              key={task._id}
              to={`/dashboard/tasks/${task._id}`}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 transition"
            >
              <ClipboardList size={18} />
              <span>{task.title}</span>
            </Link>
          ))}
        </>
      )}

      {users.length > 0 && (
        <>
          <p className="px-4 py-2 text-xs uppercase text-slate-500 font-bold">
            Users
          </p>

          {users.map((user) => (
            <Link
              key={user._id}
              to={`/dashboard/users/${user._id}`}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 transition"
            >
              <User size={18} />
              <span>{user.fullname}</span>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default SearchDropdown;
