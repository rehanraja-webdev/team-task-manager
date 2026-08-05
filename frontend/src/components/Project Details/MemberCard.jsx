import { Trash2, User } from "lucide-react";

const MemberCard = ({ role, onDelete, member, loading }) => {
  return (
    <div className="flex justify-between bg-slate-800/60 rounded-xl border border-slate-700 p-5">
      <div className="space-y-4">
        <div className="flex gap-2 text-slate-400 text-sm">
          <User />
          {member.user.fullname}{" "}
        </div>
        {member.user.role === "admin" ? (
          <span className="text-white">Owner</span>
        ) : (
          <span className="text-white">Member</span>
        )}
      </div>

      {role === "admin" && (
        <button
          type="button"
          onClick={() => onDelete(member.user._id)}
          disabled={loading}
          className="text-red-400 hover:text-red-300 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          title="Remove Member"
        >
          <Trash2 className="size-5" />
        </button>
      )}
    </div>
  );
};

export default MemberCard;
