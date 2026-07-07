import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use(errorHandler);

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running" });
});

export default app;
