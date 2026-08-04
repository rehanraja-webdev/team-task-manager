import ProfileHeader from "../components/profile/ProfileHeader";
import StatisticsCards from "../components/profile/StatisticsCards";
import PersonalInfoCard from "../components/profile/PersonalInfoCard";
import SecurityCard from "../components/profile/SecurityCard";

import useAuth from "../hooks/useAuth";
import useUserStatistics from "../hooks/useUserStatistics";

import LoadingSpinner from "../components/common/LoadingSpinner";

const ProfilePage = () => {
  const { user } = useAuth();
  const { statistics, loading } = useUserStatistics();

  if (!user || loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">Profile</h1>

        <p className="mt-2 text-slate-400">
          Manage your account information and security.
        </p>
      </div>

      <ProfileHeader user={user} />

      <StatisticsCards statistics={statistics} />

      <PersonalInfoCard user={user} />

      <SecurityCard />
    </div>
  );
};

export default ProfilePage;
