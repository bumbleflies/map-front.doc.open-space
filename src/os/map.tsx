import {OpenSpaceMarker, OpenSpaceProps} from "./marker";
import React from "react";
import {v4 as uuidv4} from "uuid";
import {Box, Fab} from "@mui/material";
import {GoogleMap, LoadScript} from "@react-google-maps/api";
import AddIcon from "@mui/icons-material/Add";
import {OpenSpace} from "./openSpace";
import dayjs from "dayjs";

type OSMapProps = {
    startLocation: google.maps.LatLngLiteral
    containerStyle: {
        width: string,
        height: string
    }
}
type OSMapState = {
    osMarker: OpenSpaceProps[],
    map: google.maps.Map | null
}

export class OSMap extends React.Component<OSMapProps, OSMapState> {
    state: OSMapState = {
        osMarker: [],
        map: null
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

    render() {
        return (

            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }

            }>
                <LoadScript
                    googleMapsApiKey="AIzaSyCmgNh28eXjQ_Il8DeEJ7E49KPwMlWFfA4"
                >
                    <GoogleMap
                        mapContainerStyle={this.props.containerStyle}
                        center={this.props.startLocation}
                        zoom={10}
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
                <Fab color="primary" aria-label="add" onClick={this.addMarker}>
                    <AddIcon/>
                </Fab>
            </Box>
        )
    }
}