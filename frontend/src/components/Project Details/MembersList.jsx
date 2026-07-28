import { NavLink, useParams } from "react-router-dom";
import { User, Users, Plus, Trash2 } from "lucide-react";
import useProject from "../../hooks/useProject";
import LoadingSpinner from "../common/LoadingSpinner";

const MembersList = () => {
  const { projectId } = useParams();
  const { members, removeMember, reloadProject, loading } =
    useProject(projectId);

  const handleDelete = async (memberId) => {
    await removeMember(projectId, memberId);
    await reloadProject();
  };

  if (loading) return <LoadingSpinner />;
  return (
    <div className="bg-slate-900 rounded-3xl p-8">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-5 mb-8">
        <div className="p-3 rounded-xl bg-purple-600/15">
          <Users className="text-purple-500" size={24} />
        </div>

        <div>
          <h1 className="text-2xl text-white font-bold">Project Members</h1>
          <p className="text-slate-400 text-sm">All members of this project</p>
        </div>

        <div className="ml-auto">
          <NavLink
            to="add-member"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white font-medium text-sm hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-500/25 active:scale-[0.98] transition-all duration-200"
          >
            <Plus className="size-4 stroke-[2.5]" />
            <span className="hidden lg:inline-block">Add Member</span>
          </NavLink>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <MemberCard
            key={member.user._id}
            onDelete={handleDelete}
            member={member}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
};

const MemberCard = ({ onDelete, member, loading }) => {
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

      <button
        type="button"
        onClick={() => onDelete(member.user._id)}
        disabled={loading}
        className="text-red-400 hover:text-red-300 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        title="Remove Member"
      >
        <Trash2 className="size-5" />
      </button>
    </div>
  );
};

export default MembersList;
