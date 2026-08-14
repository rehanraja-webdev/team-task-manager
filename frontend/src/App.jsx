import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import PublicLayout from "./layouts/PublicLayout";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Projects = lazy(() => import("./pages/Projects"));
const CreateProject = lazy(() => import("./pages/CreateProject"));
const AddProjectMember = lazy(() => import("./pages/AddProjectMember"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const TaskDetails = lazy(() => import("./pages/TaskDetails"));
const CreateTask = lazy(() => import("./pages/CreateTask"));
const Users = lazy(() => import("./pages/Users"));
const Tasks = lazy(() => import("./pages/Tasks"));
const ActivityPage = lazy(() => import("./pages/ActivityPage"));
const Analytics = lazy(() => import("./pages/Analytics"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const SettingsPage = lazy(() => import("./pages/SettingPage"));
const HelpPage = lazy(() => import("./pages/HelpPage"));
const Help = lazy(() => import("./pages/public/Help"));

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/help" element={<Help />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/create" element={<CreateProject />} />
              <Route path="projects/:projectId" element={<ProjectDetails />} />
              <Route
                path="projects/:projectId/add-member"
                element={<AddProjectMember />}
              />
              <Route
                path="projects/:projectId/tasks/new"
                element={<CreateTask />}
              />
              <Route
                path="projects/:projectId/tasks/:taskId"
                element={<TaskDetails />}
              />
              <Route path="tasks" element={<Tasks />} />
              <Route path="tasks/new" element={<CreateTask />} />
              <Route path="tasks/:taskId" element={<TaskDetails />} />
              <Route path="users" element={<Users />} />
              <Route path="activities" element={<ActivityPage />} />
              <Route path="help" element={<HelpPage />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
