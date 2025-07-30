import { createContext, useState, useContext } from "react";
import axios from "axios";

const ParcelContext = createContext();

export const ParcelProvider = ({ children }) => {
  const [parcels, setParcels] = useState([]);
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

  return (
    <ParcelContext.Provider
      value={{ parcels, bookParcel, fetchMyParcels, loading, error }}
    >
      {children}
    </ParcelContext.Provider>
  );
};

export const useParcel = () => useContext(ParcelContext);
