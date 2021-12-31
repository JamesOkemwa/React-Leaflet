import React, { useEffect } from 'react'
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-easyprint"

function PrintDownloadMap(props) {
    const map = useMap()

    useEffect(() => {
        if (!map) return;

        let print = L.easyPrint({
            title: props.title,
            position: 'topleft',
            exportOnly: props.exportOnly,
            hideControlContainer: true,
            hidden:false,
            sizeModes: ['A4Portrait', 'A4Landscape']
        })

        print.addTo(map)
        
    }, [map])

    return null;
}

export default PrintDownloadMap
