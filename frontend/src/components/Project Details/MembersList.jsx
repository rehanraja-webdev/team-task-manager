import { NavLink } from "react-router-dom";
import { Users, Plus } from "lucide-react";
import MemberCard from "./MemberCard";

const MembersList = ({
  members,
  role,
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
    <div className="rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-8 flex items-center gap-3 border-b border-slate-200 pb-5 dark:border-slate-800">
        <div className="rounded-xl bg-purple-500/15 p-3">
          <Users className="text-purple-500" size={24} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Project Members
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            All members of this project
          </p>
        </div>

        {role === "admin" && (
          <div className="ml-auto">
            <NavLink
              to="add-member"
              title="Add new member"
              className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-purple-500"
            >
              <Plus className="size-4 stroke-[2.5]" />

              <span className="hidden lg:inline-block">Add Member</span>
            </NavLink>
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <MemberCard
            key={member.user._id}
            role={role}
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
