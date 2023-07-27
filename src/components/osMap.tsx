import {Map} from "leaflet";
import {MarkerType, update} from "../types/marker";
import React, {useEffect, useState} from "react";
import {MapContainer, Marker, Tooltip} from "react-leaflet";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import {Drawer, SwipeableDrawer, Toolbar} from "@mui/material";
import {OpenSpaceInfo} from "./osInfo";
import {useNavigate} from "react-router-dom";
import {deleteMarker} from "../helper/deleter";

const munich = {
    lat: 48.135125,
    lng: 11.581980
};
type OpenSpaceMapProps = {
    map: Map
    markers: MarkerType[]
    removeMarker: (marker: MarkerType) => void
    updateMarker: (marker: MarkerType) => void
    captureMap: (map: Map) => void
    activeMarker: MarkerType | undefined
}

export const OpenSpaceMap = (props: OpenSpaceMapProps) => {
    const [activeMarker, setActiveMarker] = useState<MarkerType | undefined>(props.activeMarker)
    const navigate = useNavigate();

    useEffect(() => {
        setActiveMarker(props.activeMarker)
    }, [props.activeMarker])

    const removeMarker = (marker: MarkerType) => {
        deleteMarker(marker).then(() => {
            props.removeMarker(marker)
            navigate("/")
        })
    }


    return (
        <MapContainer center={munich}
                      zoom={13}
                      scrollWheelZoom={true}
                      zoomControl={false}
                      style={{height: '90vh'}}
                      ref={(ref: Map) => props.captureMap(ref)}>
            <ReactLeafletGoogleLayer apiKey={process.env.REACT_APP_GOOGLE_API_KEY} type={'roadmap'}/>
            {props.markers.map(marker =>
                <Marker position={marker.position}
                        draggable
                        key={marker.identifier}
                        eventHandlers={{
                            click: () => navigate(`/os/${marker.identifier}`),
                            dragend: (e) => {
                                console.log(e.target.getLatLng())
                                props.updateMarker(update(marker).with({position: e.target.getLatLng()}))
                            }
                        }}>
                    <Tooltip permanent>
                        {marker.identifier}
                    </Tooltip>
                </Marker>
            )}
            {/* Drawer on big screens https://mui.com/system/display/ */}
            {activeMarker ?
                <>
                    <Drawer
                        anchor={"left"} open={Boolean(activeMarker)}
                        onClose={() => {
                            navigate("/")
                        }}
                        sx={{
                            flexShrink: 0,
                            [`& .MuiDrawer-paper`]: {width: '400px', boxSizing: 'border-box'},
                            display: {xs: 'none', sm: 'block'}
                        }}
                        PaperProps={{
                            sx: {
                                height: '90vh',
                                top: 0,
                            },
                        }}
                    >
                        <Toolbar/>
                        <OpenSpaceInfo marker={activeMarker} removeMarker={removeMarker}
                                       updateMarker={props.updateMarker}/>
                    </Drawer>
                    <SwipeableDrawer
                        sx={{
                            display: {xs: 'block', sm: 'none'}
                        }}
                        anchor={'bottom'}
                        onOpen={() => {
                        }}
                        onClose={() => {
                            navigate('/')
                        }}
                        open={Boolean(activeMarker)}
                    >
                        <OpenSpaceInfo marker={activeMarker} removeMarker={removeMarker}
                                       updateMarker={props.updateMarker}/>
                    </SwipeableDrawer>
                </> : null}
        </MapContainer>
    )
}