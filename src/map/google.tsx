import {OpenSpaceMarker, OpenSpaceProps} from "../os/marker";
import {OpenSpace} from "../os/openSpace";
import {GoogleMap, LoadScript} from "@react-google-maps/api";
import React, {useState} from "react";

type OSMapProps = {
    startLocation: google.maps.LatLngLiteral,
    osMarker: OpenSpaceProps[],
    captureMapHandler: (map: google.maps.Map) => void,
    removeHandler: (os: OpenSpace) => void
};

export const OSMap = (props: OSMapProps) => {

    const [activeMarker, setActiveMarker] = useState<string>('')

    const handleMarkerClicked = (os: OpenSpace) => {
        setActiveMarker(os.identifier)
    }

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyCmgNh28eXjQ_Il8DeEJ7E49KPwMlWFfA4"
        >
            <GoogleMap
                mapContainerStyle={{
                    width: '100%',
                    height: '80vh'
                }}
                center={props.startLocation}
                zoom={13}
                onLoad={props.captureMapHandler}
                clickableIcons={false} // needs to be off, otherwise InfoWindow is losing reference
            >
                {props.osMarker.map(osm => (
                    <OpenSpaceMarker
                        key={osm.os.identifier}
                        location={osm.location}
                        os={osm.os}
                        removeHandler={props.removeHandler}/>
                ))}
            </GoogleMap>
        </LoadScript>
    )
};