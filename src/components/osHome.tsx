import React, {useEffect, useState} from "react";
import {Map} from "leaflet";
import {MarkerType, transientMarkerToOs} from "../types/marker";
import {
    Alert,
    AlertColor,
    AppBar,
    Avatar,
    Box,
    Button,
    Grid,
    IconButton,
    Link,
    Paper,
    Snackbar,
    Toolbar,
    Typography
} from "@mui/material";
import {Image} from "mui-image";
import {OpenSpaceMap} from "./osMap";
import AddIcon from "@mui/icons-material/Add";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import {Outlet, useFetcher, useLocation, useNavigate} from "react-router-dom";
import {localDayjs} from "../helper/dayjsTimezone";
import {StyledFab} from "./button/styledFab";
import MapContext from "./context/mapContext";
import {yellow} from '@mui/material/colors'
import {useBrowserLocation} from "./location";

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

    const [map, setMap] = useState<Map | null>(null)
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([])
    const [currentStatusMessage, setCurrentStatusMessage] = useState<StatusMessage | null>(null)

    const navigate = useNavigate();
    const fetcher = useFetcher()

    const location = useLocation()

    useEffect(() => {
        if (statusMessages.length > 0) {
            console.log(`Setting current status message: ${statusMessages[0]}`)
            setCurrentStatusMessage(statusMessages[0])
        } else {
            setCurrentStatusMessage(null)
        }
    }, [statusMessages, setCurrentStatusMessage])

    useEffect(() => {
        if (Boolean(fetcher.data)) {
            const savedMarker = fetcher.data as MarkerType
            addStatusMessage({
                id: savedMarker.identifier,
                message: `New Open Space [${savedMarker.identifier}] added`,
                type: 'success',
                withLink: {
                    to: `/os/${savedMarker.identifier}/d`,
                    text: 'Open'
                }
            })
        }
    }, [fetcher.data]);

    const addMarker = () => {
        let currentCenter = map!.getCenter()!;
        fetcher.submit(transientMarkerToOs({
            position: currentCenter,
            title: `Open Space @ ${currentCenter.lat}, ${currentCenter.lng}`,
            startDate: localDayjs().startOf('hour'),
            endDate: localDayjs().startOf('hour').add(2, 'hours')
        }), {
            method: 'post',
            encType: "application/json",
            action: 'os/'
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

    const flyTo = (position: GeolocationPosition) => {
        map?.flyTo({lat: position.coords.latitude, lng: position.coords.longitude})
    }

    const centerCurrentLocation = useBrowserLocation({locationSuccess: flyTo})

    function shouldDrawFab() {
        // dirty hack to hide FAB when image is displayed
        return location.pathname.split('/').length < 5 || location.pathname.split('/').pop() === '';
    }

    return (
        <Paper sx={{height: '100vh'}}>
            <AppBar id={"appbar"} position={"fixed"} sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <Toolbar>
                    <Avatar onClick={() => navigate('/')} data-testid={"navigate-home"}>
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
                <OpenSpaceMap/>
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
                        <Button data-testid="status-message-button" color="inherit" size="small"
                                onClick={() => {
                                    popMessage(currentStatusMessage?.id)
                                    navigate(currentStatusMessage.withLink!.to)
                                }}>
                            {currentStatusMessage.withLink.text}
                        </Button> : null}
                </Alert>
            </Snackbar>

            <Outlet/>

            <AppBar position="sticky" color="primary" sx={{top: 'auto', bottom: 10}}>
                <Toolbar>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography>made with ❤️ by 🐝🦋
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Link href={'https://bumbleflies.de'} target={"_blank"}
                                  color={yellow[700]}>bumbleflies</Link>
                        </Grid>
                    </Grid>
                    <Box sx={{flexGrow: 1}}/>
                    {shouldDrawFab() ?
                        <StyledFab data-testid={"os-home-fab-add"} color="secondary" aria-label="add"
                                   onClick={addMarker}>
                            <AddIcon/>
                        </StyledFab> : null}
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