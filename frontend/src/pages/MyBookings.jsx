import { useEffect } from "react";
import { useParcel } from "../context/ParcelContext";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:5000", {
  withCredentials: true,
});

const MyBookings = () => {
  const navigate = useNavigate();
  const { parcels, fetchMyParcels, loading, error, setParcels } = useParcel();

  useEffect(() => {
    fetchMyParcels();
  }, []);

  useEffect(() => {
    if (parcels.length > 0) {
      parcels.forEach(parcel => {
        socket.emit("joinParcelRoom", parcel._id);
      });
    }
  }, [parcels]);

  useEffect(() => {
    socket.on("parcelStatusUpdate", ({ parcelId, status, location }) => {
      console.log("Status updated for:", parcelId);
      setParcels(prev =>
        prev.map(p =>
          p._id === parcelId
            ? { ...p, status, currentLocation: location || p.currentLocation }
            : p
        )
      );
    });

    return () => {
      socket.off("parcelStatusUpdate");
    };
  }, []);

  const handleParcelTracking = async (parcelId) => {
    navigate(`/track-parcel/${parcelId}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Booking History</h2>

      {loading && <p>Loading parcels...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && parcels.length === 0 && <p>No parcels found.</p>}

      <div className="grid gap-4">
        {parcels.map((parcel) => (
          <div
            key={parcel._id}
            className="border p-4 rounded shadow-sm bg-white"
          >
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold">
                Parcel to {parcel.recipientName}({parcel.recipientPhone})
              </h3>
              <span className="px-2 py-1 text-sm rounded bg-blue-100 text-blue-600">
                {parcel.status.toUpperCase()}
              </span>
            </div>
            <p>
              <strong>Delivery:</strong> {parcel.deliveryAddress}
            </p>
            <p>
              <strong>Pickup:</strong> {parcel.pickupAddress}
            </p>
            <p>
              <strong>Weight:</strong> {parcel.weight} kg
            </p>
            <p>
              <strong>Type:</strong> {parcel.parcelType}
            </p>
            <p>
              <strong>Payment:</strong> {parcel.paymentMethod.toUpperCase()}
            </p>
            {parcel.paymentMethod === "cod" && (
              <p>
                <strong>COD Amount:</strong> Tk. {parcel.codAmount}
              </p>
            )}
            <p className="text-gray-500 text-sm mt-2">
              Booked on {new Date(parcel.createdAt).toLocaleString()}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              <button 
              className="bg-blue-600 text-white px-4 py-2 rounded text-sm" 
              onClick={() => handleParcelTracking(parcel._id)}>
                Track Parcel
              </button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
