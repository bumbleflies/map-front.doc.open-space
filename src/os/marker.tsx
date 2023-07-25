import React from "react";
import {InfoWindow, Marker} from "@react-google-maps/api";
import {Button, MobileStepper, Paper} from "@mui/material";
import {OpenSpace} from "./openSpace";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import {OpenSpaceInfo} from "./info";
import {OpenSpaceSessions} from "../session/overview";

export type OpenSpaceProps = {
    location: google.maps.LatLngLiteral | google.maps.LatLng,
    removeHandler: (os: OpenSpace) => void,
    os: OpenSpace,
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
                    // from https://icon-sets.iconify.design/ic/twotone-person-pin-circle/
                    // icon={'data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="48" height="48" viewBox="0 0 24 24"%3E%3Cpath fill="%23f1c232" d="M12 2c-4.2 0-8 3.22-8 8.2c0 3.18 2.45 6.92 7.34 11.22c.36.32.97.32 1.33 0C17.55 17.12 20 13.38 20 10.2C20 5.22 16.2 2 12 2zM7.69 12.49C8.88 11.56 10.37 11 12 11s3.12.56 4.31 1.49C15.45 13.98 13.85 15 12 15s-3.45-1.02-4.31-2.51zM12 6c1.1 0 2 .9 2 2s-.9 2-2 2s-2-.9-2-2s.9-2 2-2z"%2F%3E%3C%2Fsvg%3E'}
                    position={this.props.location}
                    draggable={true}
                    onClick={this.showInfo}
                    options={{
                        label: 'O'
                    }}
                >
                    {this.state.infoOpen ? (
                        <InfoWindow onCloseClick={this.closeInfo}>
                            <Paper>
                                    <OpenSpaceInfo os={this.state.os} removeHandler={this.props.removeHandler}/>
                                    <OpenSpaceSessions
                                        /** adaptive height hack:
                                          * initially the highest slide is taken as height for the first slide,
                                          * so we are setting height to 0 when the first step is shown
                                          **/
                                        height={this.state.activeStep * 400} shown={this.state.activeStep === 1}/>
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
