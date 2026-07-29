import { NavLink } from "react-router-dom";
import { Users, Plus } from "lucide-react";
import MemberCard from "./MemberCard";

const MembersList = ({
  members,
  deleteMember,
  reloadMembers,
  projectId,
  loading,
}) => {
  const handleDelete = async (memberId) => {
    const confirmed = confirm("Do you want to delete member?");
    if (!confirmed) return;

    await deleteMember(projectId, memberId);
    await reloadMembers();
  };

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

export default MembersList;
