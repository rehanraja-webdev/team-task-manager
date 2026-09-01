import { useState } from "react";
import {
  BookOpen,
  FolderKanban,
  CheckSquare,
  Users,
  ShieldCheck,
  UserCircle,
  ChevronDown,
  Mail,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const Help = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "What is TeamTask?",
      answer:
        "TeamTask is a project and task management platform designed to help teams organize projects, assign tasks, track progress, and work together efficiently.",
    },
    {
      question: "How do I create a project?",
      answer:
        "After signing in, open the Projects section from your dashboard and choose the option to create a new project. Add the project name and description to get started.",
    },
    {
      question: "How do I add members to a project?",
      answer:
        "Project administrators can open a project and add team members using their registered email address.",
    },
    {
      question: "How do I create and assign a task?",
      answer:
        "Open the Tasks section or a specific project, create a new task, provide its details, select a priority and due date, and assign it to a project member.",
    },
    {
      question: "Can I update a task after creating it?",
      answer:
        "Yes. Tasks can be managed throughout their lifecycle. You can update their status and other available task details from the task management interface.",
    },
    {
      question: "What do the task statuses mean?",
      answer:
        "Todo means the task has not been started, In Progress means work is currently underway, and Done means the task has been completed.",
    },
    {
      question: "Who can manage projects?",
      answer:
        "TeamTask uses user roles to control access to project management features. Administrators have additional permissions compared with regular members.",
    },
    {
      question: "I need more help. What should I do?",
      answer:
        "If you cannot find an answer here, contact the TeamTask support team using the support option below.",
    },
  ];

  const categories = [
    {
      icon: BookOpen,
      title: "Getting Started",
      description: "Learn the basics of TeamTask and get your workspace ready.",
    },
    {
      icon: FolderKanban,
      title: "Projects",
      description:
        "Learn how to create projects and organize your team's work.",
    },
    {
      icon: CheckSquare,
      title: "Tasks",
      description: "Create, assign, prioritize, and track tasks efficiently.",
    },
    {
      icon: Users,
      title: "Team Management",
      description: "Add members and collaborate with your project team.",
    },
    {
      icon: ShieldCheck,
      title: "Roles & Permissions",
      description: "Understand administrator and member access.",
    },
    {
      icon: UserCircle,
      title: "Account",
      description: "Manage your profile and account-related settings.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      {/* Hero */}
      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
            TeamTask Help Center
          </span>

          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            How can we <span className="text-indigo-500">help you?</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400">
            Find answers to common questions and learn how to get the most out
            of TeamTask.
          </p>
        </div>
      </section>

      {/* Help Categories */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10">
          <h2 className="text-2xl font-bold">Help Topics</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Explore the areas you need help with.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/40"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                  <Icon size={22} />
                </div>

                <h3 className="text-lg font-semibold">{category.title}</h3>

                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {category.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Getting Started */}
      <section className="border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10">
            <h2 className="text-2xl font-bold">Getting Started</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Get your TeamTask workspace running in a few simple steps.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Create your account",
                text: "Sign up for TeamTask and complete your account setup.",
              },
              {
                number: "02",
                title: "Create a project",
                text: "Set up a project and define its goals and scope.",
              },
              {
                number: "03",
                title: "Start managing tasks",
                text: "Create tasks, assign them to members, and track progress.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900"
              >
                <span className="text-sm font-bold text-indigo-500">
                  {step.number}
                </span>

                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>

                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Quick answers to common TeamTask questions.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium">{faq.question}</span>

                  <ChevronDown
                    size={19}
                    className={`shrink-0 text-slate-500 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-slate-200 px-5 py-4 dark:border-slate-800">
                    <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Support */}
      <section className="mx-6 mb-16">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-indigo-600 px-6 py-12 text-center text-white sm:px-12">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
            <Mail size={24} />
          </div>

          <h2 className="mt-5 text-2xl font-bold">Still need help?</h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-indigo-100">
            Can't find what you're looking for? Get in touch with the TeamTask
            support team and we'll help you out.
          </p>

          <a
            href="mailto:support@teamtask.app"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
          >
            Contact Support
            <ArrowRight size={17} />
          </a>
        </div>
      </section>

      {/* Back to App */}
      <div className="pb-16 text-center">
        <Link
          to="/"
          className="text-sm font-medium text-indigo-500 hover:text-indigo-400"
        >
          ← Back to TeamTask
        </Link>
      </div>
    </main>
  );
};

export default Help;
