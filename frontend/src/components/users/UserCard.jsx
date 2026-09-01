import { User, Mail, Shield, CalendarDays } from "lucide-react";
import formatDate from "../../utils/formatDate";

const UserCard = ({ user }) => {
  const roleStyle = {
    admin:
      "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400",
    member: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
  };

  return (
    <div
      className="
        rounded-2xl border
        border-slate-200 bg-white
        p-6
        transition-all duration-300
        hover:border-purple-500
        hover:shadow-lg hover:shadow-purple-500/10
        dark:border-slate-800 dark:bg-slate-900
      "
    >
      {/* Avatar */}
      <div className="flex justify-center">
        <div
          className="
            flex h-16 w-16 items-center justify-center
            rounded-full
            bg-purple-100
            dark:bg-purple-600/20
          "
        >
          <User className="text-purple-600 dark:text-purple-400" size={30} />
        </div>
      </div>

      {/* Name */}
      <div className="mt-4 text-center">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          {user.fullname}
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {user.email}
        </p>
      </div>

      {/* Role */}
      <div className="mt-6 flex justify-center">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
            roleStyle[user.role] ||
            "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
          }`}
        >
          <Shield size={16} />
          {user.role}
        </span>
      </div>

      {/* Details */}
      <div
        className="
          mt-6 space-y-4
          border-t border-slate-200 pt-5
          dark:border-slate-800
        "
      >
        {/* Email */}
        <div className="flex items-center gap-3">
          <Mail
            size={18}
            className="shrink-0 text-slate-500 dark:text-slate-500"
          />

          <div className="min-w-0">
            <p className="text-xs uppercase text-slate-500">Email</p>

            <p className="truncate text-sm text-slate-900 dark:text-white">
              {user.email}
            </p>
          </div>
        </div>

        {/* Joined */}
        <div className="flex items-center gap-3">
          <CalendarDays
            size={18}
            className="shrink-0 text-slate-500 dark:text-slate-500"
          />

          <div>
            <p className="text-xs uppercase text-slate-500">Joined</p>

            <p className="text-sm text-slate-900 dark:text-white">
              {formatDate(user.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
