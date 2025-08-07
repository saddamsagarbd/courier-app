import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useParcel } from "../context/ParcelContext";
import io from "socket.io-client";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GMAP_API_KEY;
const socket = io(process.env.REACT_APP_BASE_URL);

const ParcelTracker = () => {
    const { parcelId } = useParams();
    const { parcel, fetchParcelsById } = useParcel();
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const mapInstance = useRef(null);
    // Load
    useEffect(() => {
        if (parcelId) {
            fetchParcelsById(parcelId);
            socket.emit("joinParcelRoom", parcelId);
        }
    }, []);

    // 2. Setup map + initial marker
    useEffect(() => {
        if (!parcel?.currentLocation) return;

        if (!window.google) {
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

            mapInstance.current = new window.google.maps.Map(mapRef.current, {
                center: parcel.currentLocation,
                zoom: 15,
            });

            markerRef.current = new window.google.maps.Marker({
                position: parcel.currentLocation,
                map: mapInstance.current,
                title: "Parcel Location",
            });
        }
    }, [parcel?.currentLocation]);

    useEffect(() => {
        socket.on("parcelStatusUpdate", ({ currentLocation }) => {
            if (markerRef.current && currentLocation) {
                markerRef.current.setPosition(currentLocation);
                markerRef.current.getMap().setCenter(currentLocation);
            }
        });

        return () => {
            socket.off("parcelStatusUpdate");
        };
    }, []);

    return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default ParcelTracker;
