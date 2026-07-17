import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import startEmailWorker from "./src/workers/email.worker.js";
import startOverdueTaskJob from "./src/jobs/overdueTask.job.js";
import http from "http";
import { initSocket } from "./src/socket/socket.js";

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
initSocket(server);

const startServer = async () => {
  try {
    await connectDB();
    await startOverdueTaskJob();
    startEmailWorker();

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
