import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/v1/auth.routes.js";
import projectRoutes from "./routes/v1/project.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import taskRoutes from "./routes/task.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import activityRoutes from "./routes/activity.routes.js";
import attachmentRoutes from "./routes/attachment.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import path from "path";
import logger from "./middlewares/logger.middleware.js";
import rateLimiter from "./middlewares/rateLimit.middleware.js";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

const app = express();
app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173"],
    credentials: true,
  }),
);
app.use(
  express.json({
    limit: "10kb",
  }),
);
app.use(cookieParser());
app.use(helmet());
app.use(logger);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", rateLimiter);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/attachments", attachmentRoutes);
app.use("/uploads", express.static("uploads"));

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use(errorHandler);

app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running" });
});

export default app;
