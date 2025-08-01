import io from "socket.io-client";
import { useEffect } from "react";

const socket = io("http://localhost:5000");

export default function ParcelStatusTracker({ parcelId }) {
    useEffect(() => {
        socket.emit("joinParcelRoom", parcelId);

        socket.on("parcelStatusUpdate", (data) => {
        if (data.parcelId === parcelId) {
            // Update UI with new status
            console.log("Status update received:", data);
            // e.g., setParcelStatus(data.status);
        }
        });

        return () => {
        socket.off("parcelStatusUpdate");
        };
    }, [parcelId]);

    return <div></div>;
}
