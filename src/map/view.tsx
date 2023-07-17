import {OpenSpaceProps} from "../os/marker";
import React from "react";
import {v4 as uuidv4} from "uuid";
import {Paper} from "@mui/material";
import {OpenSpace} from "../os/openSpace";
import dayjs from "dayjs";
import {OSActionMenu} from "./menu";
import {OSMap} from "./google";

type OSMapViewProps = {
    startLocation: google.maps.LatLngLiteral
}

type OSMapViewState = {
    osMarker: OpenSpaceProps[],
    map: google.maps.Map | null,
}

export class OSMapView extends React.Component<OSMapViewProps, OSMapViewState> {
    state: OSMapViewState = {
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

            removeHandler: this.removeMarker,
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

    removeMarker = (os: OpenSpace) => {
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
                marginTop: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <OSMap startLocation={this.props.startLocation} osMarker={this.state.osMarker}
                       captureMapHandler={this.captureMap} removeHandler={this.removeMarker}/>
                <OSActionMenu addMarker={this.addMarker} centerCurrentLocation={this.centerCurrentLocation}/>
            </Paper>
        )
    }
}