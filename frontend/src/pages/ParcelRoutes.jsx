import { LoadScript } from "@react-google-maps/api";
import DeliveryMap from "./DeliveryMap";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GMAP_API_KEY;

export default function ParcelRoutes() {
  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <DeliveryMap />
    </LoadScript>
  );
}
