import io from "socket.io-client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParcel } from "../context/ParcelContext";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:5000", {
  withCredentials: true,
});

export default function AssignedParcel() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState(null);
  const { parcels, fetchAssignedParcels, updateParcelStatus } = useParcel();

  const statuses = [
    "assigned",
    "picked-up",
    "in-transit",
    "delivered",
    "failed",
  ];

  useEffect(() => {
    try {
      fetchAssignedParcels();

      socket.on("parcelStatusUpdate", ({ newStatus, location }) => {
        setStatus(newStatus);
        if (location) setLocation(location);
        console.log("Updated:", newStatus, location);
      });

      // Cleanup to prevent memory leaks
      return () => {
        socket.off("parcelStatusUpdate");
      };
      
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updateDeliveryStatus = async (parcelId, newStatus) => {
    socket.emit("joinParcelRoom", parcelId);

    const currentParcel = parcels.find((p) => p._id === parcelId);
    if (!currentParcel) {
      toast.error("Parcel not found.");
      return;
    }

    if (newStatus === "assigned") {
      toast.error("Agent assigned. You cannot change its status.");
      return;
    }

    if (currentParcel.status === "delivered") {
      toast.error("Parcel is already delivered. You cannot change its status.");
      return;
    }


    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const location = { latitude, longitude };

        try {
          await updateParcelStatus(parcelId, newStatus, location);
          socket.emit("parcelStatusUpdate", {
            parcelId,
            newStatus,
            location: location,
          });
          toast.success("Status updated successfully.");
          await fetchAssignedParcels(); // refresh state
        } catch (error) {
          toast.error("Failed to update status.");
        }
      },
      (error) => {
        toast.error("Unable to retrieve your location.");
        console.error(error);
      }
    );
  };

  const handleGetDirection = async (parcelId) => {
    navigate(`/get-direction/${parcelId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <table className="table-auto w-full border">
          <thead>
            <tr>
              <th>Parcel ID</th>
              <th>Receiver</th>
              <th>Address</th>
              <th>Status</th>
              <th>Get Direction</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id}>
                <td>{parcel.trackingNumber}</td>
                <td>
                  {parcel.recipientName} ({parcel.recipientPhone})
                </td>
                <td>{parcel.deliveryAddress}</td>
                <td>
                  <select
                    onChange={(e) =>
                      updateDeliveryStatus(parcel._id, e.target.value)
                    }
                    value={parcel.status || ""}
                  >
                    <option value="" disabled>
                      Select status
                    </option>
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button 
                  className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
                  onClick={() => handleGetDirection(parcel._id)}>
                    Get Direction
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
