import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useParcel } from "../context/ParcelContext";

export default function ManageParcels() {
  const { parcels, agents, fetchParcels, fetchAgents, assignAgent } = useParcel();

  useEffect(() => {
    try {
      fetchParcels();
      fetchAgents();

    } catch (error) {
      console.log(error);
    }
  }, []);

  const assignDeliveryAgent = async (parcelId, agentId) => {
    try {
      await assignAgent(parcelId, agentId);
      toast.success("Agent assigned successfully.");
      await fetchParcels(); // Refresh the list after assignment
    } catch (error) {
      toast.error("Failed to assign agent.");
    }
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
              <th>Assign Agent</th>
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
                      assignDeliveryAgent(parcel._id, e.target.value)
                    }
                    value={parcel.assignedAgent || ""}
                  >
                    <option value="" disabled>
                      Select agent
                    </option>
                    {agents.map((agent) => (
                      <option key={agent._id} value={agent._id}>
                        {agent.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
