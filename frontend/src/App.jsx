import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import Projects from "./pages/Projects";
import CreateProject from "./pages/CreateProject";
import AddProjectMember from "./pages/AddProjectMember";
import ProjectDetails from "./pages/ProjectDetails";
import TaskDetails from "./pages/TaskDetails";
import CreateTask from "./pages/CreateTask";
import Users from "./pages/Users";
import Tasks from "./pages/Tasks";
import ActivityPage from "./pages/ActivityPage";
import Analytics from "./pages/Analytics";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingPage";
import HelpPage from "./pages/HelpPage";
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

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
    </BrowserRouter>
  );
};

export default App;
