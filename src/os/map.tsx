import {OpenSpaceMarker, OpenSpaceProps} from "./marker";
import React from "react";
import {v4 as uuidv4} from "uuid";
import {AppBar, Box, Fab, IconButton, Paper, styled, Toolbar} from "@mui/material";
import {GoogleMap, LoadScript} from "@react-google-maps/api";
import AddIcon from "@mui/icons-material/Add";
import {OpenSpace} from "./openSpace";
import dayjs from "dayjs";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import MenuIcon from '@mui/icons-material/Menu';

type OSMapProps = {
    startLocation: google.maps.LatLngLiteral
    containerStyle: {
        width: string,
        height: string
    }
}
type OSMapState = {
    osMarker: OpenSpaceProps[],
    map: google.maps.Map | null,
}

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
});

export class OSMap extends React.Component<OSMapProps, OSMapState> {
    state: OSMapState = {
        osMarker: [],
        map: null,
    }


    captureMap = (m: google.maps.Map) => {
        console.log(`capturing map`)
        this.setState({map: m})
    };

    addMarker = () => {
        let location = this.state.map!.getCenter()!
        let openSpace: OpenSpaceProps = {
            location: location,

            removeHandler: this.handleRemove,
            os: {
                name: `Open Space #${this.state.osMarker.length}`,
                startDate: dayjs(),
                endDate: dayjs(),
                identifier: uuidv4()
            }
        }
        console.log(`adding new open space ${JSON.stringify(openSpace)}`);
        this.setState(state => ({
            osMarker: [...state.osMarker, openSpace]
        }))
    };

    handleRemove = (os: OpenSpace) => {
        console.log(`removing open space ${os.identifier}`)
        let remainingOS = this.state.osMarker.filter(osm => osm.os.identifier !== os.identifier)
        this.setState({
            osMarker: remainingOS
        })
    }

    centerCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(this.locationSuccess)
    }

    locationSuccess = (position: GeolocationPosition) => {
        this.state.map?.setCenter({lat: position.coords.latitude, lng: position.coords.longitude})
    }

    render() {
        return (
            <Paper sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <LoadScript
                    googleMapsApiKey="AIzaSyCmgNh28eXjQ_Il8DeEJ7E49KPwMlWFfA4"
                >
                    <GoogleMap
                        mapContainerStyle={this.props.containerStyle}
                        center={this.props.startLocation}
                        zoom={13}
                        onLoad={this.captureMap}
                    >
                        {this.state.osMarker.map(osm => (
                            <OpenSpaceMarker
                                key={osm.os.identifier}
                                location={osm.location}
                                os={osm.os}
                                removeHandler={this.handleRemove}/>
                        ))}
                    </GoogleMap>
                </LoadScript>

                <AppBar position="sticky" color="primary" sx={{top: 'auto', bottom: 10}}>
                    <Toolbar>
                        <IconButton color="inherit" aria-label="open drawer">
                            <MenuIcon/>
                        </IconButton>
                        <StyledFab color="secondary" aria-label="add" onClick={this.addMarker}>
                            <AddIcon/>
                        </StyledFab>
                        <Box sx={{flexGrow: 1}}/>

                        <IconButton onClick={this.centerCurrentLocation} color="inherit"
                                    aria-label={"current location"}>
                            <MyLocationIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Paper>
        )
    }
}