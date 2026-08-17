import { Link } from "react-router-dom";
import { FolderPlus, ClipboardList, ArrowRight } from "lucide-react";

const EmptyDashboard = ({ role }) => {
  const isAdmin = role === "admin";

  const content = isAdmin
    ? {
        icon: FolderPlus,
        title: "Welcome to TeamTask!",
        description:
          "You haven't created any projects yet. Create your first project to start organizing tasks and collaborating with your team.",
        buttonText: "Create Your First Project",
        buttonLink: "/dashboard/projects/create",
      }
    : {
        icon: ClipboardList,
        title: "You're all set!",
        description:
          "You don't have any tasks assigned to you yet. Once a project manager assigns you a task, it will appear here.",
        buttonText: "View My Tasks",
        buttonLink: "/dashboard/tasks",
      };

  const Icon = content.icon;

  return (
    <section className="flex min-h-105 items-center justify-center rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
          <Icon size={30} strokeWidth={1.8} />
        </div>

        <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {content.title}
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
          {content.description}
        </p>

        <Link
          to={content.buttonLink}
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md"
        >
          {content.buttonText}
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
};

export default EmptyDashboard;
