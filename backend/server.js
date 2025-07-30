import { Server } from "socket.io";
import http from "http";

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Agent updates location
    socket.on("update-location", async ({ parcelId, lat, lng }) => {
        try {
        const parcel = await Parcel.findByIdAndUpdate(parcelId, {
            currentLocation: { lat, lng }
        }, { new: true });

        // Emit updated location to customers
        io.emit(`parcel-location-${parcelId}`, parcel.currentLocation);
        } catch (err) {
        console.error("Location update error:", err);
        }
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

export { io };
