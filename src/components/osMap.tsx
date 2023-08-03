import {Map} from "leaflet";
import {MarkerType, update} from "../types/marker";
import React, {useContext} from "react";
import {MapContainer, Marker, Tooltip} from "react-leaflet";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import {Outlet, useNavigate} from "react-router-dom";
import MapContext, {MapContextType} from "./os/mapContext";

const munich = {
    lat: 48.135125,
    lng: 11.581980
};
type OpenSpaceMapProps = {
    markers: MarkerType[]
    updateMarker: (marker: MarkerType) => void
}

export const OpenSpaceMap = (props: OpenSpaceMapProps) => {
    const {setMap} = useContext<MapContextType>(MapContext)
    const navigate = useNavigate();

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
            <Outlet/>
        </MapContainer>
    )
}