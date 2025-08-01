import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useParcel } from "../context/ParcelContext";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GMAP_API_KEY;

const ParcelTracker = () => {
    const { parcelId } = useParams();
    const { parcel, fetchParcelsById } = useParcel();
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    // Load
    useEffect(() => {
        if (parcelId) {
            fetchParcelsById(parcelId);
        }
    }, []);

    useEffect(() => {
        if (!window.google) {
            // Load Google Maps script if not loaded
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
            script.async = true;
            script.onload = () => initializeMap();
            document.head.appendChild(script);
        } else {
            initializeMap();
        }

        function initializeMap() {
            if (!parcel.currentLocation) return;

            const map = new window.google.maps.Map(mapRef.current, {
                center: { lat: parcel.currentLocation.lat, lng: parcel.currentLocation.lng },
                zoom: 15,
            });

            markerRef.current = new window.google.maps.Marker({
                position: { lat: parcel.currentLocation.lat, lng: parcel.currentLocation.lng },
                map,
                title: "Parcel Location",
            });
        }
    }, [parcel.currentLocation]);

    useEffect(() => {
        if (markerRef.current && parcel.currentLocation) {
        markerRef.current.setPosition({ lat: parcel.currentLocation.lat, lng: parcel.currentLocation.lng });
        markerRef.current.getMap().setCenter({ lat: parcel.currentLocation.lat, lng: parcel.currentLocation.lng });
        }
    }, [parcel.currentLocation]);

    return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default ParcelTracker;
