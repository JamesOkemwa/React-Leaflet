import React, { useEffect } from 'react'
import { useMap } from "react-leaflet";
import L from "leaflet";
import 'leaflet-measure'; 
import 'leaflet-measure/dist/leaflet-measure.css';

const MeasureControl = () => {
    const map = useMap()

    useEffect(() => {
        if (!map) return;

        let measureControl = new L.Control.Measure({
            position: 'topright',
            lineColor: 'blue',
            primaryLengthUnit: 'kilometers',
            primaryAreaUnit: 'acres',
            activeColor: '#6aeb07',
            completedColor: '#2f6109'
        })

        measureControl.addTo(map)
        
    }, [map])

    return null
}

export default MeasureControl
