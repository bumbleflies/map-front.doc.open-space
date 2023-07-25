import React, {useRef, useState} from 'react';
import './App.css';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    ButtonBase,
    Chip,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    Grid,
    IconButton,
    MobileStepper,
    Paper,
    Skeleton,
    styled,
    SwipeableDrawer,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import {Image} from "mui-image";
import AddIcon from "@mui/icons-material/Add";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import {v4 as uuidv4} from "uuid";
import {MapContainer, Marker, Popup, Tooltip} from 'react-leaflet';
import {LatLngExpression, Map, Popup as LeafletPopup} from "leaflet";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import EditIcon from "@mui/icons-material/Edit";
import dayjs, {Dayjs} from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import SwipeableViews from 'react-swipeable-views';
import {grey} from "@mui/material/colors";

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
        <>
            <Grid container spacing={2} alignItems={"center"} textAlign={"left"}>
                <Grid item xs={4} textAlign={"center"}>
                    <ButtonBase onClick={() => {
                    }}>
                        <Avatar>
                            <AddPhotoAlternateIcon></AddPhotoAlternateIcon>
                        </Avatar>
                    </ButtonBase>
                </Grid>
                <Grid item xs={8} container>
                    <Grid item xs={12}>
                        <Typography>{infoMarker.title}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color='text.secondary'>
                            {infoMarker.startDate.format("DD.MM.YYYY")}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color='text.secondary'>
                            {infoMarker.endDate.format("DD.MM.YYYY")}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>

                    </Grid>
                </Grid>
                <Grid item xs={12} container>
                    <Grid item xs={4}>
                        <Chip color={"primary"} label={"running"}></Chip>
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={2}>
                        <IconButton aria-label="edit" onClick={() => {
                            setEditOpen(true)
                        }}>
                            <EditIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton aria-label="delete"
                                    onClick={() => props.removeMarker(props.marker)}>
                            <DeleteIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
            <OpenSpaceInfoEditDialog editOpen={editOpen} closeDialogHandler={() => setEditOpen(false)}
                                     marker={infoMarker}/>
        </>
    )
}

const OpenSpaceMarkerCarousel = (props: OpenSpaceMarkerCarouselProps) => {
    const [activeStep, setActiveStep] = useState<number>(0)
    return (
        <>
            <SwipeableViews index={activeStep} enableMouseEvents={false} animateHeight={true} disableLazyLoading={true}>
                <OpenSpaceInfo marker={props.marker} removeMarker={props.removeMarker}/>
                <Container>
                    <Skeleton width={'200'} height={'200'}></Skeleton>
                </Container>
            </SwipeableViews>
            <MobileStepper
                variant="dots"
                steps={2}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={() => {
                            setActiveStep(prevState => prevState + 1)
                        }}
                        disabled={activeStep === 1}
                    >
                        Sessions <KeyboardArrowRight/>
                    </Button>
                }
                backButton={
                    <Button size="small"
                            onClick={() => {
                                setActiveStep(prevState => prevState - 1)
                            }}
                            disabled={activeStep === 0}
                    >
                        Info <KeyboardArrowLeft/>
                    </Button>
                }
            />
        </>
    )
}

const Puller = styled(Box)(({theme}) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));


const OpenSpaceMap = (props: OpenSpaceMapProps) => {
    const [activeMarker, setActiveMarker] = useState<string>('')
    const popupRef = useRef<LeafletPopup | null>(null)

    return (
        <MapContainer center={munich} zoom={13} scrollWheelZoom={false} style={{height: '90vh'}}
                      ref={(ref: Map) => props.captureMap(ref)}>
            <ReactLeafletGoogleLayer apiKey='AIzaSyCmgNh28eXjQ_Il8DeEJ7E49KPwMlWFfA4' type={'roadmap'}/>
            {props.markers.map(marker => {
                return <Marker position={marker.position} draggable key={marker.identifier}>

                    <Popup ref={popupRef} eventHandlers={{
                        remove: () => {
                            setActiveMarker('')
                        },
                        add: () => {
                            setActiveMarker(marker.identifier)
                        }
                    }}>
                        {marker.identifier === activeMarker ?
                            <OpenSpaceMarkerCarousel marker={marker} removeMarker={props.removeMarker}/>
                            : null
                        }
                    </Popup>
                    <Tooltip>
                        {marker.identifier}
                    </Tooltip>
                </Marker>

            })}
            <SwipeableDrawer
                anchor={"bottom"} open={Boolean(activeMarker)}
                onClose={() => {
                    popupRef.current?.remove()
                }}
                onOpen={() => {
                }}
            >
                <Box sx={{}}>
                    <Puller/>
                    <Typography sx={{p: 2, color: 'text.secondary'}}>51 results</Typography>
                </Box>

            </SwipeableDrawer>

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
            <AppBar position={"static"}>
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
