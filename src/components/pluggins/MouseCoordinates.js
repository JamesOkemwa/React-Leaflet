import React, { useEffect } from 'react'
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-mouse-position"
import "leaflet-mouse-position/src/L.Control.MousePosition.css"

const MouseCoordinates = () => {
    const map = useMap();
    useEffect(() => {
        if (!map) return;

        let mouseCoordinates = new L.control.mousePosition({
            position: "bottomleft",
            prefix: "Lat/Lng"
        })

        mouseCoordinates.addTo(map)
        
    }, [map])

    return null;
}

export default MouseCoordinates
