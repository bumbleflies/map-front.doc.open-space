import React, {useContext} from "react";
import {MapContext, MapContextType} from "../context/mapContext";
import {IconButton} from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import useBrowserLocation from "../../helper/location";

export const LocatorButton = () => {
    const {map} = useContext<MapContextType>(MapContext)
    const flyTo = (position: GeolocationPosition) => {
        map?.flyTo({lat: position.coords.latitude, lng: position.coords.longitude})
    }

    const centerCurrentLocation = useBrowserLocation({locationSuccess: flyTo})

    return (
        <IconButton onClick={centerCurrentLocation} color="inherit"
                    aria-label={"current location"}>
            <MyLocationIcon/>
        </IconButton>
    )
}