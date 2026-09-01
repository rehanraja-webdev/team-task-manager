import { ShieldCheck, UserRound } from "lucide-react";

const adminGuide = [
  "Create and manage projects.",
  "Add members to your projects.",
  "Create and assign tasks.",
  "Monitor project progress and analytics.",
];

const memberGuide = [
  "View tasks assigned to you.",
  "Update your task status.",
  "Add comments to tasks.",
  "Track project progress and deadlines.",
];

const HelpGuide = ({ role }) => {
  const isAdmin = role === "admin";

  const items = isAdmin ? adminGuide : memberGuide;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
          {isAdmin ? <ShieldCheck size={21} /> : <UserRound size={21} />}
        </div>

        <div>
          <h2 className="font-semibold text-slate-900 dark:text-white">
            {isAdmin ? "Admin Guide" : "Member Guide"}
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Helpful information based on your role.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800/60 dark:text-slate-300"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HelpGuide;
