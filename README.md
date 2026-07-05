# Team Task Manager

A full-stack project management and collaboration tool built with the MERN stack. Designed to help teams create, assign, track, and manage tasks efficiently in real-time.

## 🚀 Features

- **User Authentication:** Secure registration and login using JWT and HTTP-only cookies.
- **Role-Based Access Control:** Differentiate permissions between Admin, Project Managers, and Team Members.
- **Workspace & Project Creation:** Organize tasks by dividing them into specific projects or workspaces.
- **Task Management:** Create, update, assign, and delete tasks with priority levels (Low, Medium, High) and due dates.
- **Real-Time Updates:** Instant notifications and task status updates (To-Do, In Progress, Review, Done).
- **Interactive Dashboard:** Visual insights into project progress, pending tasks, and team productivity.
- **Responsive UI:** Fully optimized for mobile, tablet, and desktop views.

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router DOM
- CSS
- Axios (API requests)

### Backend

- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT) & bcryptjs

---

## 🛣️ Core API Endpoints Reference

### Authentication
* `POST /api/auth/register` - Create a new user account profile.
* `POST /api/auth/login` - Authenticate user credentials and return a secure session token.

### Projects & Workspaces
* `GET /api/projects` - Retrieve all projects attached to the active user profile.
* `POST /api/projects` - Create a new tracking project workflow workspace.
* `DELETE /api/projects/:id` - Delete a project board along with its associated records.

### Tasks Workflows
* `GET /api/tasks/:projectId` - Return all tasks linked to a targeted project layout.
* `POST /api/tasks` - Initialize a new task entry item inside a project board container.
* `PUT /api/tasks/:id` - Modify task content parameters, assignees, or track state movements.

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.