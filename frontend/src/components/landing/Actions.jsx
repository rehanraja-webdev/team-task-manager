import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";

const Actions = () => {
  return (
    <section className="px-5 pb-20 lg:px-8">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-indigo-600 px-6 py-14 text-center text-white sm:px-12">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Ready to organize your team's work?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-indigo-100">
          Create your TeamTask workspace and start managing projects and tasks
          more efficiently.
        </p>

        <NavLink
          to="/register"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-indigo-600 transition hover:bg-indigo-50"
        >
          Create Your Account
          <ArrowRight size={18} />
        </NavLink>
      </div>
    </section>
  );
};

export default Actions;
