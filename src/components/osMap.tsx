import {Map} from "leaflet";
import {MarkerType, update} from "../types/marker";
import React, {useContext, useEffect, useState} from "react";
import {MapContainer, Marker, Tooltip} from "react-leaflet";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import {Drawer, SwipeableDrawer, Toolbar} from "@mui/material";
import {OpenSpaceInfo} from "./osInfo";
import {useNavigate} from "react-router-dom";
import OpenSpaceImagesContext from "./os/openSpaceContext";
import {OsImageNotAvailable, OsImageType} from "../types/api";
import MapContext, {MapContextType} from "./os/mapContext";
import {apiServices} from "../helper/markerApi";

const munich = {
    lat: 48.135125,
    lng: 11.581980
};
type OpenSpaceMapProps = {
    markers: MarkerType[]
    removeMarker: (marker: MarkerType) => void
    updateMarker: (marker: MarkerType) => void
    activeMarker: MarkerType | undefined
}

export const OpenSpaceMap = (props: OpenSpaceMapProps) => {
    const [activeMarker, setActiveMarker] = useState<MarkerType | undefined>(props.activeMarker)
    const [headerImage, setHeaderImage] = useState<OsImageType | OsImageNotAvailable>(new OsImageNotAvailable())
    const {setMap} = useContext<MapContextType>(MapContext)
    const navigate = useNavigate();

    useEffect(() => {
        setActiveMarker(props.activeMarker)
    }, [props.activeMarker])

    const removeMarker = (marker: MarkerType) => {
        apiServices.delete(marker).then(() => {
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
                      ref={(ref: Map) => setMap(ref)}>
            <ReactLeafletGoogleLayer apiKey={process.env.REACT_APP_GOOGLE_API_KEY} type={'roadmap'}/>
            {props.markers.map(marker =>
                    <Marker position={marker.position}
                            draggable
                            key={marker.identifier}
                            eventHandlers={{
                                click: () => navigate(`/os/${marker.identifier}`),
                                dragend: (e) => {
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
                    <OpenSpaceImagesContext.Provider value={{headerImage: headerImage, setHeaderImage: setHeaderImage}}>

                        <Drawer
                            anchor={"left"} open={Boolean(activeMarker)}
                            onClose={() => navigate("/")}
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
                            onClose={() => navigate('/')}
                            open={Boolean(activeMarker)}
                        >
                            <OpenSpaceInfo marker={activeMarker} removeMarker={removeMarker}
                                           updateMarker={props.updateMarker}/>
                        </SwipeableDrawer>
                    </OpenSpaceImagesContext.Provider>
                    : null}
            </MapContainer>
    )
}