import { Server } from "socket.io";
let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinProject", (projectId) => {
      socket.join(projectId);
      console.log(`Socket ${socket.id} joined ${projectId}`);
    });
  });
};

export const getIO = () => io;
