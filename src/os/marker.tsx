import React from "react";
import {InfoWindow, Marker} from "@react-google-maps/api";
import {Avatar, ButtonBase, Chip, Grid, IconButton, Typography} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import EditIcon from "@mui/icons-material/Edit";
import {OpenSpaceEditDialog} from "./dialog";
import DeleteIcon from "@mui/icons-material/Delete";
import {OpenSpace} from "./openSpace";

export type OpenSpaceProps = {
    location: google.maps.LatLngLiteral | google.maps.LatLng,
    removeHandler: (os: OpenSpace) => void,
    os: OpenSpace
}
type OpenSpaceState = {
    infoOpen: boolean,
    editOpen: boolean,
    os: OpenSpace
}

export class OpenSpaceMarker extends React.Component<OpenSpaceProps, OpenSpaceState> {
    state = {
        infoOpen: false,
        editOpen: false,
        os: this.props.os,
    }
    showInfo = () => {
        this.setState({infoOpen: true})
    };
    hideInfo = () => {
        this.setState({infoOpen: false})
    };

    closeEdit = () => {
        this.setState({editOpen: false})
    };
    showEdit = () => {
        this.setState({editOpen: true})
    };

    remove = () => {
        this.props.removeHandler(this.props.os)
    }

    save = (os: OpenSpace) => {
        this.setState({
            os: os,
        })
        this.closeEdit()
    }

    render() {
        return (
            <div id={this.props.os.identifier}>
                <Marker
                    position={this.props.location}
                    label={this.props.os.name}
                    draggable={true}
                    onClick={this.showInfo}
                >
                    {this.state.infoOpen ? (
                        <InfoWindow onCloseClick={this.hideInfo}>
                            <Grid container spacing={1}>
                                <Grid item xs={4} container spacing={2}>
                                    <Grid item xs={12}>
                                        <ButtonBase>
                                            <Avatar>
                                                <ImageIcon></ImageIcon>
                                            </Avatar>
                                        </ButtonBase>
                                    </Grid>
                                    <Grid item xs>
                                        <Chip color="primary" label="active"></Chip>
                                    </Grid>
                                </Grid>
                                <Grid item xs={8} container spacing={1}>
                                    <Grid item xs={12} container>
                                        <Grid item xs={12}>
                                            <Typography>{this.state.os.name}</Typography>
                                        </Grid>
                                        <Grid item xs>
                                            <Typography
                                                color='text.secondary'>{this.state.os.startDate.format("DD.MM.YYYY")}</Typography>
                                            <Typography
                                                color='text.secondary'>{this.state.os.endDate.format("DD.MM.YYYY")}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <IconButton aria-label="edit" onClick={this.showEdit}>
                                            <EditIcon/>
                                        </IconButton>
                                        <OpenSpaceEditDialog isOpen={this.state.editOpen} onClose={this.closeEdit}
                                                             onSave={this.save} os={this.state.os}/>
                                        <IconButton aria-label="delete" onClick={this.remove}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </InfoWindow>
                    ) : null}
                </Marker>
            </div>
        )
    }
}