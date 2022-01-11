import React, { useEffect } from 'react'
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-basemaps"
import "leaflet-basemaps/L.Control.Basemaps.css"

const BasemapSwitcher = () => {
    const map = useMap();

    let basemaps = [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '',
            label: 'OSM Standard'
        }),
        // L.tileLayer('https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
        //     attribution: '',
        //     label: 'OSM Black and White'
        // }),
        L.tileLayer('https://tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: '',
            label: 'Topography'
        }),
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '',
            label: 'Aerial'
        }),
    ]

    useEffect(() => {
        if (!map) return;

        map.addControl(L.control.basemaps({
            basemaps: basemaps,
            tileX: 0,
            tileY: 0,
            tileZ: 1
        }))
        
    }, [map])

    return null;
}

export default BasemapSwitcher
