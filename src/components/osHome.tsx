import React, {useRef, useState} from "react";
import {Map} from "leaflet";
import {MarkerType} from "../types/marker";
import {v4 as uuidv4} from "uuid";
import dayjs from "dayjs";
import {
    Alert,
    AppBar,
    Avatar,
    Box,
    Button,
    Fab,
    IconButton,
    Paper,
    Snackbar,
    styled,
    Toolbar,
    Typography
} from "@mui/material";
import {Image} from "mui-image";
import {OpenSpaceMap} from "./osMap";
import AddIcon from "@mui/icons-material/Add";
import MyLocationIcon from "@mui/icons-material/MyLocation";

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
});

export const OpenSpaceHome = () => {
    const map = useRef<Map>()
    const [markers, setMarkers] = useState<MarkerType[]>([])
    const [markerAdded, setMarkerAdded] = useState<MarkerType | null>(null)

    const captureMap = (m: Map) => {
        map.current = m
    }

    const addMarker = () => {
        let currentCenter = map.current?.getCenter()!;
        let marker: MarkerType = {
            identifier: uuidv4(),
            position: currentCenter,
            title: `Open Space @ ${currentCenter.lat}, ${currentCenter.lng}`,
            startDate: dayjs().startOf('hour'),
            endDate: dayjs().endOf('hour').add(1, 'hours')
        }
        setMarkers((previous: MarkerType[]) => [...previous, marker])
        setMarkerAdded(marker)
    }

    const removeMarker = (marker: MarkerType) => {
        setMarkers((previous: MarkerType[]) => previous.filter(m => m.identifier !== marker.identifier))
    }

    const centerCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(locationSuccess)
    }

    const locationSuccess = (position: GeolocationPosition) => {
        map.current?.setView({lat: position.coords.latitude, lng: position.coords.longitude})
    }


    return (
        <Paper sx={{height: '100vh'}}>
            <AppBar position={"fixed"} sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <Toolbar>
                    <Avatar>
                        <Image src={"/img/bumblefly-blue.png"}></Image>
                    </Avatar>

                    <Box sx={{flexGrow: 1}}/>

                    <Typography component="h1" variant="h4">
                        Open Space Harvest
                    </Typography>

                    <Box sx={{flexGrow: 1}}/>
                </Toolbar>
            </AppBar>

            <OpenSpaceMap markers={markers} map={map.current!} captureMap={captureMap} removeMarker={removeMarker}/>

            <Snackbar
                open={Boolean(markerAdded)}
                autoHideDuration={6000}
                message="Archived"
                onClose={() => setMarkerAdded(null)}
                sx={{bottom: {xs: 90, sm: '10vh'}}}
                anchorOrigin={{vertical: "bottom", horizontal: "right"}}>
                <Alert onClose={() => setMarkerAdded(null)} severity="success" sx={{width: '100%'}}>
                    New Open Space [{markerAdded?.identifier}] added
                    <Button color="inherit" size="small">
                        Open
                    </Button>
                </Alert>
            </Snackbar>

            <AppBar position="sticky" color="primary" sx={{top: 'auto', bottom: 10}}>
                <Toolbar>
                    <Box sx={{flexGrow: 1}}/>
                    <StyledFab color="secondary" aria-label="add" onClick={addMarker}>
                        <AddIcon/>
                    </StyledFab>
                    <Box sx={{flexGrow: 1}}/>
                    <IconButton onClick={centerCurrentLocation} color="inherit"
                                aria-label={"current location"}>
                        <MyLocationIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Paper>
    )
}