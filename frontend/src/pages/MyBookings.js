import { useEffect } from "react";
import { useParcel } from "../context/ParcelContext";

const MyBookings = () => {
  const { parcels, fetchMyParcels, loading, error } = useParcel();

  useEffect(() => {
    fetchMyParcels();
  }, []);

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
                {parcel.status}
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
