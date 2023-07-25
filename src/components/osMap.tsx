import {Map} from "leaflet";
import {MarkerType} from "../types/marker";
import React, {useEffect, useState} from "react";
import {MapContainer, Marker, Tooltip} from "react-leaflet";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import {Drawer, Toolbar} from "@mui/material";
import {OpenSpaceInfo} from "./osInfo";
import {useNavigate} from "react-router-dom";

const munich = {
    lat: 48.135125,
    lng: 11.581980
};
type OpenSpaceMapProps = {
    map: Map
    markers: MarkerType[]
    removeMarker: (marker: MarkerType) => void
    captureMap: (map: Map) => void
    activeMarker: MarkerType | undefined
}
export const OpenSpaceMap = (props: OpenSpaceMapProps) => {
    console.log(`OpenSpaceMap[props.activeMarker]: ${props.activeMarker?.identifier}`)
    const [activeMarker, setActiveMarker] = useState<MarkerType | undefined>(props.activeMarker)
    const navigate = useNavigate();

    useEffect(() => {
        setActiveMarker(props.activeMarker)
    }, [props.activeMarker])
    console.log(`OpenSpaceMap[activeMarker]: ${activeMarker?.identifier}`)

    const removeMarker = (marker: MarkerType) => {
        props.removeMarker(marker)
        navigate("/")
    }

    return (
        <MapContainer center={munich}
                      zoom={13}
                      scrollWheelZoom={false}
                      style={{height: '90vh'}}
                      ref={(ref: Map) => props.captureMap(ref)}>
            <ReactLeafletGoogleLayer apiKey='AIzaSyCmgNh28eXjQ_Il8DeEJ7E49KPwMlWFfA4' type={'roadmap'}/>
            {props.markers.map(marker => {
                return <Marker position={marker.position}
                               draggable
                               key={marker.identifier}
                               eventHandlers={{
                                   click: () => navigate(`/os/${marker.identifier}`)
                               }}>
                    <Tooltip permanent>
                        {marker.identifier}
                    </Tooltip>
                </Marker>
            })}
            <Drawer
                anchor={"left"} open={Boolean(activeMarker)}
                onClose={() => {
                    navigate("/")
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