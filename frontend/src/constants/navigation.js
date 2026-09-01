import {
  LayoutDashboard,
  FolderOpen,
  ClipboardList,
  ChartNoAxesCombined,
  Users,
  Activity,
  Settings,
  LifeBuoy,
  User,
} from "lucide-react";

export const adminLinks = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Projects",
    icon: FolderOpen,
    path: "/dashboard/projects",
  },
  {
    name: "Tasks",
    icon: ClipboardList,
    path: "/dashboard/tasks",
  },
  {
    name: "Analytics",
    icon: ChartNoAxesCombined,
    path: "/dashboard/analytics",
  },
  {
    name: "Users",
    icon: Users,
    path: "/dashboard/users",
  },
];

export const memberLinks = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Projects",
    icon: FolderOpen,
    path: "/dashboard/projects",
  },
  {
    name: "My Tasks",
    icon: ClipboardList,
    path: "/dashboard/tasks",
  },
  {
    name: "Activities",
    icon: Activity,
    path: "/dashboard/activities",
  },
];

export const generalLinks = [
  {
    name: "Profile",
    icon: User,
    path: "/dashboard/profile",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
  },
  {
    name: "Help",
    icon: LifeBuoy,
    path: "/dashboard/help",
  },
];
