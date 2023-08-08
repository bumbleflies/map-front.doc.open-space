import {Map} from "leaflet";
import {MarkerType, update} from "../types/marker";
import React, {useContext} from "react";
import {MapContainer, Marker, Tooltip} from "react-leaflet";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import {Outlet, useLoaderData, useNavigate, useSubmit} from "react-router-dom";
import MapContext, {MapContextType} from "./context/mapContext";
import {markerToOs} from "../helper/apiMapper";

const munich = {
    lat: 48.135125,
    lng: 11.581980
};

export const OpenSpaceMap = () => {
    const loadedMarker = useLoaderData() as MarkerType[]
    const {setMap} = useContext<MapContextType>(MapContext)
    const navigate = useNavigate();
    const editSubmit = useSubmit()

    const updateMarker = (marker: MarkerType) => {
        editSubmit(markerToOs(marker), {
            method: 'put',
            encType: "application/json",
            action: `os/${marker.identifier}/edit`
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
            {loadedMarker.map(marker =>
                <Marker position={marker.position}
                        draggable
                        key={marker.identifier}
                        eventHandlers={{
                            click: () => navigate(`/os/${marker.identifier}`),
                            dragend: (e) => {
                                updateMarker(update(marker).with({position: e.target.getLatLng()}))
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