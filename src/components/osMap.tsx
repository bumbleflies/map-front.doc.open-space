import {Map} from "leaflet";
import {MarkerType} from "../types/marker";
import React, {useState} from "react";
import {MapContainer, Marker, Tooltip} from "react-leaflet";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import {Drawer, Toolbar} from "@mui/material";
import {OpenSpaceInfo} from "./osInfo";

const munich = {
    lat: 48.135125,
    lng: 11.581980
};
type OpenSpaceMapProps = {
    map: Map
    markers: MarkerType[]
    removeMarker: (marker: MarkerType) => void
    captureMap: (map: Map) => void
}
export const OpenSpaceMap = (props: OpenSpaceMapProps) => {
    const [activeMarker, setActiveMarker] = useState<MarkerType | null>(null)

    const removeMarker = (marker: MarkerType) => {
        props.removeMarker(marker)
        setActiveMarker(null)
    }

    return (
        <MapContainer center={munich} zoom={13} scrollWheelZoom={false} style={{height: '90vh'}}
                      ref={(ref: Map) => props.captureMap(ref)}>
            <ReactLeafletGoogleLayer apiKey='AIzaSyCmgNh28eXjQ_Il8DeEJ7E49KPwMlWFfA4' type={'roadmap'}/>
            {props.markers.map(marker => {
                return <Marker position={marker.position} draggable key={marker.identifier} eventHandlers={{
                    click: () => setActiveMarker(marker)
                }}>
                    <Tooltip permanent>
                        {marker.identifier}
                    </Tooltip>
                </Marker>
            })}
            <Drawer
                anchor={"left"} open={Boolean(activeMarker)}
                onClose={() => {
                    setActiveMarker(null)
                }}
                sx={{
                    width: '30vw',
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {width: '30vw', boxSizing: 'border-box'},
                }}
                PaperProps={{
                    sx: {
                        height: '90vh',
                        top: 0,
                    },
                }}
            >
                <Toolbar/>
                <OpenSpaceInfo marker={activeMarker!} removeMarker={removeMarker}/>
            </Drawer>
        </MapContainer>
    )
}