import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import taskRoutes from "./routes/task.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import activityRoutes from "./routes/activity.routes.js";
import attachmentRoutes from "./routes/attachment.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import path from "path";
import logger from "./middlewares/logger.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(logger);

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/attachments", attachmentRoutes);
app.use("/uploads", express.static("uploads"));

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use(errorHandler);

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running" });
});

export default app;
