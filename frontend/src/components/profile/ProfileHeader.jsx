import { CalendarDays, Mail } from "lucide-react";

const ProfileHeader = ({ user }) => {
  const initials = user?.fullname
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <div className="flex flex-col items-center gap-5 md:flex-row">
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-indigo-600 text-4xl font-bold text-white shadow-lg">
          {initials}
        </div>

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-bold text-white">{user.fullname}</h2>

          <div className="mt-3 flex flex-col gap-2 text-slate-400 md:flex-row md:items-center md:gap-6">
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <Mail size={16} />
              <span>{user.email}</span>
            </div>

            <div className="flex items-center justify-center gap-2 md:justify-start">
              <CalendarDays size={16} />
              <span>
                Joined{" "}
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          <span className="mt-4 inline-flex rounded-full bg-indigo-500/20 px-4 py-1 text-sm font-medium capitalize text-indigo-300">
            {user.role}
          </span>
        </div>
      </div>
    </div>
  );
};
export default ProfileHeader;
