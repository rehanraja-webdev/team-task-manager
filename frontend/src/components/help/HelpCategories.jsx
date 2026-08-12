import {
  Rocket,
  FolderKanban,
  CheckSquare,
  Users,
  BarChart3,
  UserCircle,
} from "lucide-react";

const categories = [
  {
    title: "Getting Started",
    description: "Learn the basics of TeamTask.",
    icon: Rocket,
  },
  {
    title: "Projects",
    description: "Create and manage projects.",
    icon: FolderKanban,
  },
  {
    title: "Tasks",
    description: "Create, assign, and track tasks.",
    icon: CheckSquare,
  },
  {
    title: "Team Members",
    description: "Work with your project team.",
    icon: Users,
  },
  {
    title: "Analytics",
    description: "Understand your project data.",
    icon: BarChart3,
  },
  {
    title: "Account",
    description: "Manage your account settings.",
    icon: UserCircle,
  },
];

const HelpCategories = () => {
  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
        Quick Help
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <div
              key={category.title}
              className="
                group rounded-2xl border p-5 transition-all
                border-slate-200 bg-white
                hover:border-indigo-300 hover:shadow-md
                dark:border-slate-800 dark:bg-slate-900
                dark:hover:border-indigo-500/40
              "
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 transition group-hover:bg-indigo-500 group-hover:text-white">
                <Icon size={20} />
              </div>

              <h3 className="font-semibold text-slate-900 dark:text-white">
                {category.title}
              </h3>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {category.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HelpCategories;
