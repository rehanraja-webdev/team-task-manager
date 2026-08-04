import { Mail, ShieldCheck, CalendarDays, User, Pencil } from "lucide-react";
import { useState } from "react";
import EditProfileModal from "./EditProfileModal";

const PersonalInfoCard = ({ user }) => {
  const [open, setOpen] = useState(false);

  const details = [
    {
      icon: User,
      label: "Full Name",
      value: user.fullname,
    },
    {
      icon: Mail,
      label: "Email",
      value: user.email,
    },
    {
      icon: ShieldCheck,
      label: "Role",
      value: user.role,
    },
    {
      icon: CalendarDays,
      label: "Joined",
      value: new Date(user.createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    },
  ];

  return (
    <>
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Personal Information
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              View and update your account information.
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 cursor-pointer"
          >
            <Pencil size={16} />
            Edit
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {details.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-xl border border-slate-800 bg-slate-950 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-indigo-500/20 p-2">
                    <Icon size={18} className="text-indigo-400" />
                  </div>

                  <div>
                    <p className="text-sm text-slate-400">{item.label}</p>

                    <p className="mt-1 font-medium capitalize text-white">
                      {item.value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <EditProfileModal
        open={open}
        onClose={() => setOpen(false)}
        user={user}
      />
    </>
  );
};

export default PersonalInfoCard;
