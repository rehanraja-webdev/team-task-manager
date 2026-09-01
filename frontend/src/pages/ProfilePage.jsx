import ProfileHeader from "../components/profile/ProfileHeader";
import PersonalInfoCard from "../components/profile/PersonalInfoCard";
import SecurityCard from "../components/profile/SecurityCard";
import useAuth from "../hooks/useAuth";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Profile
        </h1>

        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Manage your account information and security.
        </p>
      </div>

      <ProfileHeader user={user} />

      <PersonalInfoCard user={user} />

      <SecurityCard />
    </div>
  );
};

export default ProfilePage;
