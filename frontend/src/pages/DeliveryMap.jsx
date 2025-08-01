import { useEffect, useState } from "react";
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useParcel } from "../context/ParcelContext";
import { useParams } from "react-router-dom";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: 23.8103, // Dhaka (center of BD)
  lng: 90.4125,
};

const DeliveryMapPage = () => {
  const { parcelId } = useParams();
  const { parcel, fetchParcelsById } = useParcel();
  const [directions, setDirections] = useState(null);

  // Load assigned parcels
  useEffect(() => {
    if (parcelId) {
      fetchParcelsById(parcelId);
    }
  }, [parcelId, fetchParcelsById]);

  if (!parcel || !parcel.deliveryAddress) return <p>Loading map...</p>;

  const origin = parcel?.pickupAddress || "";
  const destination = parcel?.deliveryAddress || "";
  const waypoints = [];

  if (!origin || !destination) {
    // handle missing addresses (show error or loading)
    return <p>Loading or invalid addresses</p>;
  }

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={11}>
      {!directions && origin && destination && (
        <DirectionsService
          options={{
            origin,
            destination,
            waypoints,
            optimizeWaypoints: true,
            travelMode: "DRIVING",
          }}
          callback={(result, status) => {
            if (status === "OK") {
              setDirections(result);
            } else {
              console.error("Directions request failed", status);
            }
          }}
        />
      )}

      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default DeliveryMapPage;
