// src/components/ParcelHistory.js
import { useEffect } from "react";
import { useParcel } from "../context/ParcelContext";

const ParcelHistory = () => {
  const { parcels, fetchParcelHistory, loading } = useParcel();

  useEffect(() => {
    fetchParcelHistory();
  }, []);

  return (
    <div>
      <h2>Your Parcel History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {parcels.map((parcel) => (
            <li key={parcel._id}>
              <p>From: {parcel.pickupAddress}</p>
              <p>To: {parcel.deliveryAddress}</p>
              <p>Status: {parcel.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
