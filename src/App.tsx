import React, {useRef, useState} from 'react';
import './App.css';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    ButtonBase,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Drawer,
    Fab,
    Grid,
    IconButton,
    Paper,
    styled,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import {Image} from "mui-image";
import AddIcon from "@mui/icons-material/Add";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import {v4 as uuidv4} from "uuid";
import {MapContainer, Marker, Tooltip} from 'react-leaflet';
import {LatLngExpression, Map} from "leaflet";
import EditIcon from "@mui/icons-material/Edit";
import dayjs, {Dayjs} from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightIcon from '@mui/icons-material/Nightlight';
import {yellow} from "@mui/material/colors";

const munich = {
    lat: 48.135125,
    lng: 11.581980
};
const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
});

type MarkerType = {
    identifier: string,
    position: LatLngExpression,
    title: string,
    startDate: Dayjs,
    endDate: Dayjs
}

type OpenSpaceMapProps = {
    map: Map
    markers: MarkerType[]
    removeMarker: (marker: MarkerType) => void
    captureMap: (map: Map) => void
}

type OpenSpaceMarkerCarouselProps = {
    marker: MarkerType
    removeMarker: (marker: MarkerType) => void
}

type OpenSpaceInfoProps = {
    marker: MarkerType
    removeMarker: (marker: MarkerType) => void
}

type OpenSpaceInfoEditDialogProps = {
    editOpen: boolean
    closeDialogHandler: () => void
    marker: MarkerType
}
const OpenSpaceInfoEditDialog = (props: OpenSpaceInfoEditDialogProps) => {
    const [title, setTitle] = useState<string>(props.marker.title)
    const [startDate, setStartDate] = useState<Dayjs>(props.marker.startDate)
    const [endDate, setEndDate] = useState<Dayjs>(props.marker.endDate)

    const acceptStartDate = (startDate: Dayjs | null) => {
        if (startDate != null) {
            if (startDate.isAfter(endDate)) {
                let dateDifference = endDate.diff(startDate)
                setStartDate(startDate)
                setEndDate(startDate.add(dateDifference))
            } else {
                setStartDate(startDate)
            }
        }
    }

    const cancelEdit = () => {
        setTitle(props.marker.title)
        setStartDate(props.marker.startDate)
        setEndDate(props.marker.endDate)
        props.closeDialogHandler()
    }

    const saveEdit = () => {
        props.marker.title = title
        props.marker.startDate = startDate
        props.marker.endDate = endDate
        props.closeDialogHandler()
    }

    return (
        <Dialog open={props.editOpen} onClose={props.closeDialogHandler}>
            <DialogTitle>Edit Open Space Info</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <DialogContentText>
                            What is the name of the Open Space you're attending?
                        </DialogContentText>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Open Space Name"
                            fullWidth
                            variant="standard"
                            defaultValue={title}
                            onChange={v => setTitle(v.target.value)}
                        />
                    </Grid>
                    <Grid item container spacing={2}>
                        <Grid item xs={12}>
                            <DialogContentText>
                                Was is the runtime of the Open Space?
                            </DialogContentText>
                        </Grid>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Grid item xs={6}>
                                <DateTimePicker label={"Start Date"} value={startDate}
                                                format="DD.MM.YYYY HH:mm"
                                                onAccept={acceptStartDate}/>
                            </Grid>
                            <Grid item xs={6}>
                                <DateTimePicker label={"End Date"} value={endDate}
                                                format="DD.MM.YYYY HH:mm"
                                                onAccept={() => {
                                                }}/>
                            </Grid>
                        </LocalizationProvider>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={cancelEdit}>Cancel</Button>
                <Button onClick={saveEdit}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}

const OpenSpaceInfo = (props: OpenSpaceInfoProps) => {
    const [infoMarker] = useState<MarkerType>(props.marker)

    const [editOpen, setEditOpen] = useState<boolean>(false)

    return (
        <Box sx={{}}>
            <Grid container spacing={0} alignItems={"center"} textAlign={"left"}>
                {/* Image */}
                <Grid item xs={12} textAlign={"center"}>
                    <ButtonBase onClick={() => {
                    }}>
                        <Image src={"/img/no-image-icon.png"}/>
                    </ButtonBase>
                </Grid>
                {/* Title */}
                <Grid item xs={12} textAlign={"left"}>
                    <Box sx={{p: 2}}>
                        <Typography variant={"h6"}>{infoMarker.title}</Typography>
                    </Box>
                </Grid>
                {/* Dates */}
                <Grid item xs={12} textAlign={"left"} container>
                    <Box sx={{px: 2, flexGrow: 1}}>
                        <Grid item xs={12} textAlign={"left"} container>
                            <Grid item xs={6} container>
                                <Grid item xs={2}>
                                    <WbSunnyIcon/>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography color='text.secondary'>
                                        {infoMarker.startDate.format("DD.MM.YYYY")}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={6} container>
                                <Grid item xs={2}>
                                    <NightlightIcon/>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography color='text.secondary'>
                                        {infoMarker.endDate.format("DD.MM.YYYY")}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={12} textAlign={"left"} container>
                    <Box sx={{py: 2, flexGrow: 1}}>
                        <Divider/>
                    </Box>
                </Grid>
                <Grid item xs={12} container>
                    <Grid item xs={4}/>
                    <Grid item xs={2}>
                        <Typography color='text.secondary' textAlign={"center"}>
                            <IconButton aria-label="edit" onClick={() => {
                                setEditOpen(true)
                            }}>
                                <Avatar sx={{bgcolor: yellow[700]}}>
                                    <EditIcon/>
                                </Avatar>
                            </IconButton>
                            Edit
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography color='text.secondary' textAlign={"center"}>
                            <IconButton aria-label="delete"
                                        onClick={() => props.removeMarker(props.marker)}>
                                <Avatar sx={{bgcolor: yellow[700]}}>
                                    <DeleteIcon/>
                                </Avatar>
                            </IconButton>
                            Delete
                        </Typography>
                    </Grid>
                    <Grid item xs={4}/>
                </Grid>
                <Grid item xs={12} textAlign={"left"} container>
                    <Box sx={{py: 2, flexGrow: 1}}>
                        <Divider/>
                    </Box>
                </Grid>

            </Grid>

            <OpenSpaceInfoEditDialog editOpen={editOpen} closeDialogHandler={() => setEditOpen(false)}
                                     marker={infoMarker}/>
        </Box>
    )
}


const OpenSpaceMap = (props: OpenSpaceMapProps) => {
    const [activeMarker, setActiveMarker] = useState<MarkerType | null>(null)

    const removeMarker = (marker: MarkerType) => {
        props.removeMarker(marker)
        setActiveMarker(null)
    }

    return (
        <MapContainer center={munich} zoom={13} scrollWheelZoom={false} style={{height: '90vh'}}
                      ref={(ref: Map) => props.captureMap(ref)}>
            <ReactLeafletGoogleLayer apiKey='AIzaSyCmgNh28eXjQ_Il8DeEJ7E49KPwMlWFfA4' type={'roadmap'}/>
            {props.markers.map(marker => {
                return <Marker position={marker.position} draggable key={marker.identifier} eventHandlers={{
                    click: () => setActiveMarker(marker)
                }}>
                    <Tooltip permanent>
                        {marker.identifier}
                    </Tooltip>
                </Marker>
            })}
            <Drawer
                anchor={"left"} open={Boolean(activeMarker)}
                onClose={() => {
                    setActiveMarker(null)
                }}
                sx={{
                    width: '30vw',
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {width: '30vw', boxSizing: 'border-box'},
                }}
                PaperProps={{
                    sx: {
                        height: '90vh',
                        top: 0,
                    },
                }}
            >
                <Toolbar/>
                <OpenSpaceInfo marker={activeMarker!} removeMarker={removeMarker}/>
            </Drawer>

        </MapContainer>
    )
}

const OpenSpaceDocApp = () => {

    const map = useRef<Map>()
    const [markers, setMarkers] = useState<MarkerType[]>([])


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
                        <Image src={"/bumblefly-blue.png"}></Image>
                    </Avatar>

                    <Box sx={{flexGrow: 1}}/>

                    <Typography component="h1" variant="h4">
                        Open Space Harvest
                    </Typography>

                    <Box sx={{flexGrow: 1}}/>
                </Toolbar>
            </AppBar>

            <OpenSpaceMap markers={markers} map={map.current!} captureMap={captureMap} removeMarker={removeMarker}/>

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

export default React.memo(OpenSpaceDocApp)
