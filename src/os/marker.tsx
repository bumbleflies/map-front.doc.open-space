import React from "react";
import {InfoWindow, Marker} from "@react-google-maps/api";
import {Box, Button, MobileStepper, Paper} from "@mui/material";
import {OpenSpace} from "./openSpace";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import {OpenSpaceInfo} from "./info";

export type OpenSpaceProps = {
    location: google.maps.LatLngLiteral | google.maps.LatLng,
    removeHandler: (os: OpenSpace) => void,
    os: OpenSpace
}
type OpenSpaceState = {
    infoOpen: boolean,
    os: OpenSpace,
    activeStep: number
}

export class OpenSpaceMarker extends React.Component<OpenSpaceProps, OpenSpaceState> {
    state = {
        os: this.props.os,
        activeStep: 0,
        infoOpen: false
    }
    showInfo = () => {
        this.setState({infoOpen: true})
    };
    closeInfo = () => {
        this.setState({infoOpen: false})
    };


    detailsRef = React.createRef<Marker>()

    stepNext = () => {
        this.setState({
            activeStep: this.state.activeStep + 1
        })
    }


    stepBack = () => {
        this.setState({
            activeStep: this.state.activeStep - 1
        })
    }


    render() {
        return (
            <React.Fragment key={"marker"}>

                <Marker
                    position={this.props.location}
                    label={this.props.os.name}
                    draggable={true}
                    onClick={this.showInfo}
                    ref={this.detailsRef}
                >
                    {this.state.infoOpen ? (
                        <InfoWindow onCloseClick={this.closeInfo}>
                            <Box>
                                <Paper>
                                    <OpenSpaceInfo os={this.state.os} detailsRef={this.detailsRef}
                                                   removeHandler={this.props.removeHandler}/>
                                    <MobileStepper
                                        variant="dots"
                                        steps={2}
                                        position="static"
                                        activeStep={this.state.activeStep}
                                        nextButton={
                                            <Button
                                                size="small"
                                                onClick={this.stepNext}
                                                disabled={this.state.activeStep === 1}
                                            >
                                                Sessions <KeyboardArrowRight/>
                                            </Button>
                                        }
                                        backButton={
                                            <Button size="small"
                                                    onClick={this.stepBack}
                                                    disabled={this.state.activeStep === 0}
                                            >
                                                Info <KeyboardArrowLeft/>
                                            </Button>
                                        }
                                    />
                                </Paper>
                            </Box>
                        </InfoWindow>
                    ) : null}
                </Marker>
            </React.Fragment>
        )
    }
}
