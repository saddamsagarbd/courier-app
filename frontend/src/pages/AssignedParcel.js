import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useParcel } from "../context/ParcelContext";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function AssignedParcel() {
  const navigate = useNavigate();
  const { parcels, fetchAssignedParcels, updateParcelStatus } = useParcel();
  const { user, logout } = useContext(AuthContext);

  const statuses = [
    "assigned",
    "picked-up",
    "in-transit",
    "delivered",
    "failed",
  ];

  useEffect(() => {
    fetchAssignedParcels();
  }, []);

  const updateDeliveryStatus = async (parcelId, newStatus) => {
    const currentParcel = parcels.find((p) => p._id === parcelId);
    if (!currentParcel) {
      toast.error("Parcel not found.");
      return;
    }

    if (currentParcel.status === "assigned") {
      toast.error("Agent assigned. You cannot change its status.");
      return;
    }

    if (currentParcel.status === "delivered") {
      toast.error("Parcel is already delivered. You cannot change its status.");
      return;
    }
    try {
      await updateParcelStatus(parcelId, newStatus);
      toast.success("Status updated successfully.");
      await fetchAssignedParcels(); // refresh state
    } catch (error) {
      toast.error("Failed to update status.");
    }
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
                  <button onClick={() => handleGetDirection(parcel._id)}>
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
