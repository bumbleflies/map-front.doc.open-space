import React from "react";
import {InfoWindow, Marker} from "@react-google-maps/api";
import {Button, MobileStepper, Paper} from "@mui/material";
import {OpenSpace} from "./openSpace";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import {OpenSpaceInfo} from "./info";
import {OpenSpaceSessions} from "./sessions";
import Carousel from "nuka-carousel"

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
                            <Paper>
                                <Carousel slideIndex={this.state.activeStep} withoutControls={true}
                                          adaptiveHeight={true}>
                                    <OpenSpaceInfo os={this.state.os} removeHandler={this.props.removeHandler}/>
                                    <OpenSpaceSessions/>
                                </Carousel>
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
                        </InfoWindow>
                    ) : null}
                </Marker>
            </React.Fragment>
        )
    }
}
