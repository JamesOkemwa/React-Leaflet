import React, { useEffect } from 'react'
import { useMap } from "react-leaflet";
import L from "leaflet";
import './Legend.css'

const Legend = () => {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        let legend = L.control({ position: "bottomleft" })

        legend.onAdd = function(map) {
            var div = L.DomUtil.create("div", "legend");
            div.innerHTML += "<h4>Legend</h4>";
            div.innerHTML += '<i style="background: #477AC2"></i><span>Water</span><br>';
            div.innerHTML += '<i style="background: #448D40"></i><span>Forest</span><br>';
            div.innerHTML += '<i style="background: #E6E696"></i><span>Land</span><br>';

            return div;
        }

        legend.addTo(map)
        
    }, [map])

    return null;
}

export default Legend
