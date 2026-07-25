import useAdmin from "../hooks/useAdmin";
import { Users as UsersIcon } from "lucide-react";
import UserCard from "../components/users/UserCard";
import LoadingSpinner from "../components/common/LoadingSpinner";

const Users = () => {
  const { users, loading } = useAdmin();

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      {/* Header */}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white">
            All <span className="text-purple-500">Users</span>
          </h1>

          <p className="text-slate-400 mt-2">
            View all registered users in your workspace.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-900 px-5 py-3 rounded-2xl border border-slate-800">
          <UsersIcon className="text-purple-500" />

          <div>
            <p className="text-slate-400 text-sm">Total Users</p>

            <p className="text-white font-bold text-xl">{users.length}</p>
          </div>
        </div>
      </div>

      {/* Users */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Users;
