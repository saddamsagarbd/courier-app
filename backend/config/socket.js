
import { Server } from "socket.io";
let io = null;

export const initSocket = (server, allowedOrigins = "*") => {
    io = new Server(server, {
        cors: {
            origin: allowedOrigins,
            credentials: true,
            methods: ["GET", "POST"],
        },
    });
    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);

        socket.on("joinParcelRoom", (parcelId) => {
        console.log(`Joining room: ${parcelId}`);
        socket.join(parcelId);
        });

        socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
        });
    });
    return io;
};

export const getIO = () => {
    if (!io) throw new Error("Socket.io not initialized");
    return io;
};
