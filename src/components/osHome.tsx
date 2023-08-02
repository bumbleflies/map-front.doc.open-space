import React, {useEffect, useState} from "react";
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
import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import {localDayjs} from "../helper/dayjsTimezone";
import {StyledFab} from "./button/styledFab";
import MapContext from "./os/mapContext";
import {apiServices} from "../helper/markerApi";

type StatusMessage = {
    id: string
    message: string
    type: AlertColor
    withLink?: {
        to: string
        text: string
    }
}
type OpenSpaceHarvesterHomeType = {
    // mainly used for testing the module
    map?: Map
}
export const OpenSpaceHarvesterHome = (props: OpenSpaceHarvesterHomeType) => {
    const {id} = useParams<"id">();
    const loadedMarker = useLoaderData() as MarkerType[]

    const [map, setMap] = useState<Map | null>(props.map ? props.map : null)
    const [markers, setMarkers] = useState<MarkerType[]>([])
    const [urlMarker, setUrlMarker] = useState<MarkerType>()

    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([])
    const [currentStatusMessage, setCurrentStatusMessage] = useState<StatusMessage | null>(null)
    const navigate = useNavigate();

    useEffect(() => {
        let foundMarker = markers.find(m => m.identifier === id);
        setUrlMarker(foundMarker)
        if (foundMarker !== undefined) {
            map?.setView(foundMarker.position!, 15, {animate: true})
        }
    }, [id, markers, urlMarker, map])

    useEffect(() => {
        if (loadedMarker.length > 0) {
            setMarkers(loadedMarker)
        }
    }, [loadedMarker])

    useEffect(() => {
        if (statusMessages.length > 0) {
            console.log(`Setting current status message: ${statusMessages[0]}`)
            setCurrentStatusMessage(statusMessages[0])
        } else {
            setCurrentStatusMessage(null)
        }
    }, [statusMessages])

    const addMarker = () => {
        let currentCenter = map!.getCenter()!;
        let marker: TransientMarker = {
            position: currentCenter,
            title: `Open Space @ ${currentCenter.lat}, ${currentCenter.lng}`,
            startDate: localDayjs().startOf('hour'),
            endDate: localDayjs().startOf('hour').add(2, 'hours')
        }
        console.log(apiServices)
        console.log(apiServices.save)
        apiServices.save(marker).then(savedMarker => {
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
        apiServices.put(marker).then(updatedMarker => {
            setMarkers((previous: MarkerType[]) => {
                return [...previous.filter(m => m.identifier !== updatedMarker.identifier), updatedMarker]
            })
        })

    }

    const addStatusMessage = (message: StatusMessage) => {
        console.log('adding status message', message)
        setStatusMessages(prevState => [...prevState, message])
    }

    const popMessage = (messageId?: string) => {
        setStatusMessages(prevState => {
            console.log(`popping ${messageId} from messages`)
            return prevState.filter(m => m.id !== messageId)
        })
    }

    const centerCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(locationSuccess)
    }

    const locationSuccess = (position: GeolocationPosition) => {
        map?.setView({lat: position.coords.latitude, lng: position.coords.longitude})
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

            <MapContext.Provider value={{map: map, setMap: setMap}}>
                <OpenSpaceMap activeMarker={urlMarker} markers={markers}
                              removeMarker={removeMarker} updateMarker={updateMarker}/>
            </MapContext.Provider>

            <Snackbar
                open={Boolean(currentStatusMessage)}
                autoHideDuration={6000}
                onClose={() => popMessage(currentStatusMessage?.id)}
                sx={{bottom: {xs: 90, sm: '10vh'}}}
                anchorOrigin={{vertical: "bottom", horizontal: "right"}}>
                <Alert onClose={() => popMessage(currentStatusMessage!.id)} severity={currentStatusMessage?.type}
                       sx={{width: '100%'}}>
                    {currentStatusMessage?.message}
                    {currentStatusMessage?.withLink !== undefined ?
                        <Button color="inherit" size="small"
                                onClick={() => {
                                    popMessage(currentStatusMessage?.id)
                                    navigate(currentStatusMessage.withLink!.to)
                                }}>
                            {currentStatusMessage.withLink.text}
                        </Button> : null}
                </Alert>
            </Snackbar>

            <AppBar position="sticky" color="primary" sx={{top: 'auto', bottom: 10}}>
                <Toolbar>
                    <Box sx={{flexGrow: 1}}/>
                    <StyledFab data-testid={"os-home-fab-add"} color="secondary" aria-label="add" onClick={addMarker}>
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