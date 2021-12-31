import React, { useEffect } from 'react'
import { useMap } from "react-leaflet";
import L from "leaflet";
import "./leaflet-ruler.css";
import "./leaflet-ruler";

function LeafletRuler() {
    const map = useMap()

    useEffect(() => {
        if (!map) return;

        L.control.ruler.addTo(map)
    }, [map])
    return null
}

export default LeafletRuler
