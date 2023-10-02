import {Map} from "leaflet";
import {markerToOs, MarkerType, update} from "../../types/marker";
import React, {useContext} from "react";
import {MapContainer, Marker, Tooltip} from "react-leaflet";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import {useLoaderData, useNavigate, useSubmit} from "react-router-dom";
import {MapContext, MapContextType} from "../context/mapContext";
import {useBackendAuth} from "../auth/hooks";


const munich = {
    lat: 48.135125,
    lng: 11.581980
};

export const OpenSpaceMap = () => {
    const {setMap} = useContext<MapContextType>(MapContext)
    const loadedMarker = useLoaderData() as MarkerType[]
    const navigate = useNavigate();
    const editSubmit = useSubmit();
    const {withAccessToken} = useBackendAuth()

    const updateMarker = (marker: MarkerType) => {
        withAccessToken().then((accessToken) => editSubmit({os: markerToOs(marker), token: accessToken!}, {
            method: 'put',
            encType: "application/json",
            action: `os/${marker.identifier}/d/edit`
        }))
    }

    return (
        <MapContainer center={munich}
                      zoom={13}
                      scrollWheelZoom={true}
                      zoomControl={false}
                      style={{height: '90vh'}}
                      ref={(ref: Map) => setMap(ref)}>
            <ReactLeafletGoogleLayer useGoogMapsLoader={false} apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                                     type={'roadmap'}/>
            {loadedMarker.map(marker =>
                <Marker position={marker.position}
                        draggable
                        key={marker.identifier}
                        eventHandlers={{
                            click: () => navigate(`/os/${marker.identifier}/d`),
                            dragend: (e) => {
                                updateMarker(update(marker).with({position: e.target.getLatLng()}))
                            }
                        }}>
                    <Tooltip permanent>
                        {marker.title}
                    </Tooltip>
                </Marker>
            )}
        </MapContainer>
    )
}