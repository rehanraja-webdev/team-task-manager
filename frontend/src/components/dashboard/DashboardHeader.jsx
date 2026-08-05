import SearchBox from "./SearchBox";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";

const DashboardHeader = () => {
  return (
    <>
      <div className="flex justify-between items-center bg-slate-900 rounded-2xl p-4 border border-slate-800 mb-8">
        <SearchBox />

        <div className="flex items-center gap-4">
          <NotificationDropdown />
          <ProfileDropdown />
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
