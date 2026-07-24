import { User, Users } from "lucide-react";

const MembersList = ({ project }) => {
  return (
    <div className="bg-slate-900 rounded-3xl p-8 lg:col-span-2">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-5 mb-8">
        <div className="p-3 rounded-xl bg-purple-600/15">
          <Users className="text-purple-500 size={24} " />
        </div>
        <div>
          <h1 className="text-2xl text-white font-bold">Project Members</h1>
          <p className="text-slate-400 text-sm">All members of this project</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {project.members.map((member) => (
          <MemberCard
            key={member.user._id}
            member={member}
            name={member.user.fullname}
            role={member.user.role}
          />
        ))}
      </div>
    </div>
  );
};

const MemberCard = ({ name, role }) => {
  return (
    <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-5 space-y-4">
      <div className="flex gap-2 text-slate-400 text-sm">
        <User />
        {name}{" "}
      </div>
      {role === "admin" ? (
        <span className="text-white">Owner</span>
      ) : (
        <span className="text-white">Member</span>
      )}
    </div>
  );
};

export default MembersList;
