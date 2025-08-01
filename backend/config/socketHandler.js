export const socketHandler = (io) => {
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
};
