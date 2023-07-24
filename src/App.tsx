import React, {createRef, useEffect, useState} from 'react';
import './App.css';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    ButtonBase,
    Chip,
    Container,
    Fab,
    Grid,
    IconButton,
    MobileStepper,
    Paper,
    styled,
    Toolbar,
    Typography
} from "@mui/material";
import {Image} from "mui-image";
import AddIcon from "@mui/icons-material/Add";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import {v4 as uuidv4} from "uuid";
import {MapContainer, Marker, Popup, TileLayer, Tooltip} from 'react-leaflet';
import {LatLngExpression, Map} from "leaflet";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import Carousel from "nuka-carousel";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";

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
    position: LatLngExpression
}

const OpenSpaceDocApp = () => {

    const map = createRef<Map>()
    const [markers, setMarkers] = useState<MarkerType[]>([])

    const [activeStep, setActiveStep] = useState<number>(0)
    const [activeMarker, setActiveMarker] = useState<string>('')

    const addMarker = () => {
        let currentCenter = map.current?.getCenter()!;
        let marker: MarkerType = {identifier: uuidv4(), position: currentCenter}
        setMarkers((previous: MarkerType[]) => [...previous, marker])
    }

    const centerCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(locationSuccess)
    }

    const locationSuccess = (position: GeolocationPosition) => {
        map.current?.setView({lat: position.coords.latitude, lng: position.coords.longitude})
    }

    useEffect(() => {
        console.log('activeStep: ' + activeStep)
    }, [activeStep])


    return (
        <Paper sx={{height: '100vh'}}>
            <AppBar position={"static"} sx={{height: '5vh'}}>
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
            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{height: '90vh'}} ref={map}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers.map(marker => {
                    return <Marker position={marker.position} draggable key={marker.identifier}>
                        <Popup eventHandlers={{
                            remove: () => {
                                setActiveMarker('')
                            },
                            add: () => {
                                setActiveMarker(marker.identifier)
                            }
                        }}>
                            {marker.identifier === activeMarker ?
                                <>
                                    <Carousel slideIndex={activeStep} withoutControls={true}
                                              adaptiveHeight={true} swiping={false} // currently not working correctly
                                    >
                                        <Grid container spacing={0}>
                                            <Grid item xs={4} container spacing={2}>
                                                <Grid item xs={12}>
                                                    <ButtonBase onClick={() => {
                                                    }}>
                                                        <Avatar>
                                                            <AddPhotoAlternateIcon></AddPhotoAlternateIcon>

                                                        </Avatar>
                                                    </ButtonBase>

                                                </Grid>
                                                <Grid item xs>
                                                    <Chip color={"primary"} label={"running"}></Chip>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={8} container spacing={1}>
                                                <Grid item xs={12} container>
                                                    <Grid item xs={12}>
                                                        <Typography>{marker.identifier}</Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography
                                                            color='text.secondary'>{dayjs().format("DD.MM.YYYY")}</Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography
                                                            color='text.secondary'>{dayjs().format("DD.MM.YYYY")}</Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid item>
                                                    <IconButton aria-label="edit" onClick={() => {
                                                    }}>
                                                        <EditIcon/>
                                                    </IconButton>

                                                    <IconButton aria-label="delete" onClick={() => {
                                                    }}>
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Container>
                                            <AddPhotoAlternateIcon></AddPhotoAlternateIcon>
                                        </Container>
                                    </Carousel>
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
                                : null}
                        </Popup>
                        <Tooltip>
                            {marker.identifier}
                        </Tooltip>
                    </Marker>

                })}
            </MapContainer>

            <AppBar position="sticky" color="primary" sx={{top: 'auto', bottom: 10, height: '5vh'}}>
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
