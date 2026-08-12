const WorkProcess = () => {
  return (
    <section id="how-it-works" className="py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-semibold text-indigo-500">HOW IT WORKS</p>

          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            Get started in three simple steps
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            {
              number: "01",
              title: "Create a project",
              text: "Set up a project and define what your team wants to accomplish.",
            },
            {
              number: "02",
              title: "Add your team",
              text: "Invite team members and assign responsibilities within the project.",
            },
            {
              number: "03",
              title: "Manage your tasks",
              text: "Create tasks, track their status, and monitor your team's progress.",
            },
          ].map((step) => (
            <div key={step.number} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-lg font-bold text-white">
                {step.number}
              </div>

              <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-400">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
