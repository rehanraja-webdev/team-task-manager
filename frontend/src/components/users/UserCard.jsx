import { User, Mail, Shield, CalendarDays } from "lucide-react";
import formatDate from "../../utils/formatDate";

const UserCard = ({ user }) => {
  const roleStyle = {
    admin: "bg-purple-500/20 text-purple-400",
    member: "bg-blue-500/20 text-blue-400",
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
      {/* Avatar */}

      <div className="flex justify-center">
        <div className="h-16 w-16 rounded-full bg-purple-600/20 flex items-center justify-center">
          <User className="text-purple-400" size={30} />
        </div>
      </div>

      {/* Name */}

      <div className="text-center mt-4">
        <h2 className="text-xl font-semibold text-white">{user.fullname}</h2>

        <p className="text-slate-400 text-sm mt-1">{user.email}</p>
      </div>

      {/* Role */}

      <div className="mt-6 flex justify-center">
        <span
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
            roleStyle[user.role]
          }`}
        >
          <Shield size={16} />
          {user.role}
        </span>
      </div>

      {/* Details */}

      <div className="mt-6 border-t border-slate-800 pt-5 space-y-4">
        <div className="flex items-center gap-3">
          <Mail size={18} className="text-slate-500" />

          <div>
            <p className="text-xs uppercase text-slate-500">Email</p>

            <p className="text-white text-sm">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <CalendarDays size={18} className="text-slate-500" />

          <div>
            <p className="text-xs uppercase text-slate-500">Joined</p>

            <p className="text-white text-sm">{formatDate(user.createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
