import { Trash2, User } from "lucide-react";

const MemberCard = ({ role, onDelete, member, loading }) => {
  return (
    <div className="flex justify-between rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/60">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <User size={18} />
          {member.user.fullname}
        </div>

        {member.user.role === "admin" ? (
          <span className="text-slate-900 dark:text-white">Owner</span>
        ) : (
          <span className="text-slate-900 dark:text-white">Member</span>
        )}
      </div>

      {role === "admin" && (
        <button
          type="button"
          onClick={() => onDelete(member.user._id)}
          disabled={loading}
          className="cursor-pointer text-red-500 transition-all hover:-translate-y-0.5 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-red-400 dark:hover:text-red-300"
          title="Remove Member"
        >
          <Trash2 className="size-5" />
        </button>
      )}
    </div>
  );
};

export default MemberCard;
