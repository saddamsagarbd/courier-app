import { getIO } from "./socket.js";

export const emitParcelStatusUpdate = (parcelId, status, location = null) => {
    const io = getIO();
    console.log("Emitting to room:", parcelId, status, location);
    io.to(parcelId).emit("parcelStatusUpdate", { parcelId, status, location });
};
