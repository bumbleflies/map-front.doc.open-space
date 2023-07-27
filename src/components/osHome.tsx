import React, {useEffect, useRef, useState} from "react";
import {Map} from "leaflet";
import {MarkerType, TransientMarker} from "../types/marker";
import {
    Alert,
    AlertColor,
    AppBar,
    Avatar,
    Box,
    Button,
    IconButton,
    Paper,
    Snackbar,
    Toolbar,
    Typography
} from "@mui/material";
import {Image} from "mui-image";
import {OpenSpaceMap} from "./osMap";
import AddIcon from "@mui/icons-material/Add";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import {Link, useLoaderData, useParams} from "react-router-dom";
import {saveMarker} from "../helper/saver";
import {putMarker} from "../helper/updater";
import {localDayjs} from "../helper/dayjsTimezone";
import {StyledFab} from "./styledFab";

type StatusMessage = {
    id: string
    message: string
    type: AlertColor
    withLink?: {
        to: string
        text: string
    }
}

export const OpenSpaceHarvesterHome = () => {
    const {id} = useParams<"id">();
    const loadedMarker = useLoaderData() as MarkerType[]

    const map = useRef<Map>()
    const [markers, setMarkers] = useState<MarkerType[]>([])
    const [urlMarker, setUrlMarker] = useState<MarkerType>()

    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([])
    const [currentStatusMessage, setCurrentStatusMessage] = useState<StatusMessage | null>(null)

    useEffect(() => {
        let foundMarker = markers.find(m => m.identifier === id);
        setUrlMarker(foundMarker)
        if (foundMarker !== undefined) {
            map.current?.setView(foundMarker.position!, 15, {animate: true})
        }
    }, [id, markers])

    useEffect(() => {
            setMarkers(loadedMarker)
        }
        , [loadedMarker])

    const captureMap = (m: Map) => {
        map.current = m
    }

    const addMarker = () => {
        let currentCenter = map.current?.getCenter()!;
        let marker: TransientMarker = {
            position: currentCenter,
            title: `Open Space @ ${currentCenter.lat}, ${currentCenter.lng}`,
            startDate: localDayjs().startOf('hour'),
            endDate: localDayjs().startOf('hour').add(2, 'hours')
        }
        saveMarker(marker).then(savedMarker => {
            setMarkers((previous: MarkerType[]) => [...previous, savedMarker])
            addStatusMessage({
                id: savedMarker.identifier,
                message: `New Open Space [${savedMarker.identifier}] added`,
                type: 'success',
                withLink: {
                    to: `/os/${savedMarker.identifier}`,
                    text: 'Open'
                }
            })
        })
    }

    const removeMarker = (marker: MarkerType) => {
        setMarkers((previous: MarkerType[]) => previous.filter(m => m.identifier !== marker.identifier))
        addStatusMessage({
            id: marker.identifier,
            message: `Open Space [${marker.identifier}] removed`,
            type: "error"
        })
    }

    const updateMarker = (marker: MarkerType) => {
        putMarker(marker).then(updatedMarker => {
            setMarkers((previous: MarkerType[]) => {
                return [...previous.filter(m => m.identifier !== updatedMarker.identifier), updatedMarker]
            })
        })
    }

    useEffect(() => {
        if (statusMessages.length > 0) {
            setCurrentStatusMessage(statusMessages[0])
        } else {
            setCurrentStatusMessage(null)
        }
    }, [statusMessages])

    const addStatusMessage = (message: StatusMessage) => {
        console.log('adding status message', message)
        setStatusMessages(prevState => [...prevState, message])
    }

    const popMessage = (messageId: string) => {
        setStatusMessages(prevState => {
            console.log(`poping ${messageId} from messages`)
            return prevState.filter(m => m.id !== messageId)
        })
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

            <OpenSpaceMap activeMarker={urlMarker} markers={markers} map={map.current!} captureMap={captureMap}
                          removeMarker={removeMarker} updateMarker={updateMarker}/>

            <Snackbar
                open={Boolean(currentStatusMessage)}
                autoHideDuration={6000}
                onClose={() => popMessage(currentStatusMessage!.id)}
                sx={{bottom: {xs: 90, sm: '10vh'}}}
                anchorOrigin={{vertical: "bottom", horizontal: "right"}}>
                <Alert onClose={() => popMessage(currentStatusMessage!.id)} severity={currentStatusMessage?.type}
                       sx={{width: '100%'}}>
                    {currentStatusMessage?.message}
                    {currentStatusMessage?.withLink !== undefined ?
                        <Button color="inherit" size="small" component={Link} to={currentStatusMessage.withLink.to}>
                            {currentStatusMessage.withLink.text}
                        </Button> : null}
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