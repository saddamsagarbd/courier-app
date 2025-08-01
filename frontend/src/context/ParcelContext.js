import { createContext, useState, useContext } from "react";
import axios from "axios";

const ParcelContext = createContext();

export const ParcelProvider = ({ children }) => {
  const [parcels, setParcels] = useState([]);
  const [parcel, setParcel] = useState([]);
  const [agents, setAgents] = useState([]);
  const [totalParcels, setTotalParcels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const bookParcel = async (parcelData) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/parcels/booking`,
        parcelData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setParcels([...parcels, data]);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchMyParcels = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/parcels/my-bookings`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setParcels(data.parcels);
      setTotalParcels(data.totalBooking);
      return data;
    } catch (err) {
      setError("Failed to load parcel history");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchParcels = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/parcels/booked`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setParcels(data);
  };
  const fetchParcelsById = async (parcelId) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/parcels/${parcelId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(data);
    setParcel(data);
  };
  const fetchAssignedParcels = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/parcels/booked?status=all`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setParcels(data);
  };

  const fetchAgents = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/parcels/agents`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setAgents(data);
  };
  const assignAgent = async (parcelId, agentId) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/parcels/${parcelId}/assign-agent`,
        { agentId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Agent assignment failed", error);
    }
  };
  const updateParcelStatus = async (parcelId, status) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/parcels/${parcelId}/update-status`,
        { status },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Agent assignment failed", error);
    }
  };

  return (
    <ParcelContext.Provider
      value={{
        parcels,
        parcel,
        agents,
        totalParcels,
        bookParcel,
        fetchMyParcels,
        fetchParcels,
        fetchAssignedParcels,
        fetchAgents,
        assignAgent,
        updateParcelStatus,
        fetchParcelsById,
        loading,
        error,
      }}
    >
      {children}
    </ParcelContext.Provider>
  );
};

export const useParcel = () => useContext(ParcelContext);
