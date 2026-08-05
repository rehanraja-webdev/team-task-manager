import { ListTodo, UserCheck, ClipboardList } from "lucide-react";

const TaskTabs = ({ activeTab, setActiveTab, isAdmin }) => {
  const tabs = [
    {
      id: "assigned",
      label: "Assigned To Me",
      icon: <UserCheck size={18} />,
    },
  ];

  if (isAdmin) {
    tabs.unshift(
      {
        id: "all",
        label: "All Tasks",
        icon: <ListTodo size={18} />,
      },
      {
        id: "created",
        label: "Created By Me",
        icon: <ClipboardList size={18} />,
      },
    );
  }

  return (
    <div className="mt-8 border-b border-slate-800">
      <div className="flex gap-8 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 flex items-center gap-2 whitespace-nowrap transition-all duration-200 border-b-2 ${
              activeTab === tab.id
                ? "border-purple-500 text-white"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            {tab.icon}
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskTabs;
