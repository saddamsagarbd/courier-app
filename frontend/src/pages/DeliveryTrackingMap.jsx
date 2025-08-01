import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GMAP_API_KEY

const DeliveryTrackingMap = () => {
  const { parcelId } = useParams();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`/api/parcels/location/${parcelId}`);
      const data = await res.json();
      setLocation(data);
    }, 5000);

    return () => clearInterval(interval);
  }, [parcelId]);

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location || { lat: 23.8103, lng: 90.4125 }}
        zoom={15}
      >
        {location && <Marker position={location} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default DeliveryTrackingMap;
