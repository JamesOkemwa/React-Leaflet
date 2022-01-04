import React, { useEffect } from 'react'
import { useMap } from "react-leaflet";
import L from "leaflet";

const WMSLayer = (props) => {

    const map = useMap();

    useEffect(() => {
        if (!map) return;

        let wmsLayer = L.tileLayer.wms(props.baseUrl, {
            layers: props.layerName
        })

        wmsLayer.addTo(map);
        
    }, [map])

    return null;
}

export default WMSLayer
