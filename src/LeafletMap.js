import React, { useState, createRef } from "react"
import { MapContainer, TileLayer, FeatureGroup, Marker, Popup  } from "react-leaflet"
import  { EditControl } from "react-leaflet-draw"
import "leaflet-draw/dist/leaflet.draw.css"
import L from 'leaflet'
import Leaflet from 'leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import * as parkData from "./sample_json.json"
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import useGeolocation from "./hooks/useGeolocation"
import MeasureControl from "./components/pluggins/MeasureControl"
import PrintDownloadMap from "./components/pluggins/PrintDownloadMap"
import MouseCoordinates from "./components/pluggins/MouseCoordinates"

const markerIcon = new Leaflet.Icon({
    iconUrl: require("./icons/location-icon.png"),
    iconSize: [35, 45],
    iconAnchor: [17, 46], //left/right top/bottom
    popupAnchor: [0, -46]
})

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [24, 36],
    iconAnchor: [12, 36], //left/right top/bottom
    popupAnchor: [0, -36]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Fixing the leaflet-draw icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const LeafletMap = () => {
    const [map, setMap ] = useState(null)
    const [center, setCenter ] = useState([-1.28333, 36.81667])
    const [activePark, setActivePark ] = useState(null)
    const ZOOM_LEVEL = 9

    const location = useGeolocation()

    const showMyLocation = () => {
        if (location.loaded && !location.error) {
            map.flyTo([location.coordinates.lat, location.coordinates.lng], 15, {animate:true})
        } else {
            alert(location.error.message)
        }
    }

    const _created = (e) => {
        console.log(e)
    }

    return (
        <div style={{ height: "100vh", position: "relative", marginTop: 0 }}>
            <button onClick={showMyLocation}>Locate Me</button>
            <MapContainer 
                center={center}
                zoom={ZOOM_LEVEL}
                style={{ height: "100%", position: "absolute", width: "100%"}}
                whenCreated={map => setMap(map)}
            >
                <TileLayer 
                    attribution=''
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <FeatureGroup>
                    <EditControl 
                        position="topright"
                        onCreated={_created}
                        draw={{
                            rectangle: false,
                            circle: false,
                            circlemarker: false,
                            marker: false,
                            polyline: false
                        }}
                    />
                </FeatureGroup>

                {parkData.features.map(park => (
                    <Marker 
                        key={park.properties.PARK_ID}
                        position={[ park.geometry.coordinates[1], park.geometry.coordinates[0] ]}
                        onClick={() => {
                            setActivePark(park)
                        }}
                        // icon={markerIcon}
                    >
                        <Popup>
                            <b>{park.properties.NAME}</b> <br/>
                            {park.properties.DESCRIPTION}
                        </Popup>
                    </Marker>
                ))}

                {location.loaded && !location.error && (
                    <Marker
                        position={[ location.coordinates.lat, location.coordinates.lng ]}
                    >
                        <Popup>
                            <b>You are here</b>
                        </Popup>
                    </Marker>
                )}

                <MeasureControl />
                <PrintDownloadMap exportOnly={false} title='Print Map'/>
                <PrintDownloadMap exportOnly={true} title='Download Map'/>
                <MouseCoordinates />
            </MapContainer>
        </div>
    )
}

export default LeafletMap