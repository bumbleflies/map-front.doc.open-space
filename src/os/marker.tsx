import React, {ChangeEvent} from "react";
import {InfoWindow, Marker} from "@react-google-maps/api";
import {
    Avatar,
    Box,
    Button,
    ButtonBase,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Chip,
    Fab,
    Grid,
    IconButton,
    MobileStepper,
    Paper,
    Popover,
    Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {OpenSpaceEditDialog} from "./dialog";
import DeleteIcon from "@mui/icons-material/Delete";
import {OpenSpace} from "./openSpace";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from "axios";
import {Image} from "mui-image";
import {ImageServer} from "../config/Endpoints";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";

export type OpenSpaceProps = {
    location: google.maps.LatLngLiteral | google.maps.LatLng,
    removeHandler: (os: OpenSpace) => void,
    os: OpenSpace
}
type OpenSpaceState = {
    infoOpen: boolean,
    editOpen: boolean,
    imageButton: HTMLButtonElement | null,
    marketplaceImage: any,
    os: OpenSpace,
    detailsAnchor: Marker | null,
    activeStep: number
}

const Endpoints = {
    imageUpload: ImageServer.url + '/image-upload',
    images: ImageServer.url + '/i'
}

export class OpenSpaceMarker extends React.Component<OpenSpaceProps, OpenSpaceState> {
    state = {
        infoOpen: false,
        editOpen: false,
        imageButton: null,
        marketplaceImage: null,
        os: this.props.os,
        detailsAnchor: null,
        activeStep: 0
    }
    showInfo = () => {
        this.setState({infoOpen: true})
    };
    closeInfo = () => {
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

    showImage = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({imageButton: e.currentTarget})
    }
    closeImage = () => {
        this.setState({imageButton: null})
    }
    detailsRef = React.createRef<Marker>()

    stepNext = () => {
        this.setState({
            activeStep: this.state.activeStep + 1
        })
    }

    handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        const uploadData = new FormData()
        uploadData.append('file', e.target.files[0])
        uploadData.append('fileName', e.target.files[0].name)
        console.log(`Uploading file ${uploadData} to ${Endpoints.imageUpload}`)
        axios.post(Endpoints.imageUpload, uploadData).then(response => {
            this.setState({marketplaceImage: response.data})
        })


    }

    stepBack = () => {
        this.setState({
            activeStep: this.state.activeStep - 1
        })
    }

    componentDidMount() {
        this.setState({
            detailsAnchor: this.detailsRef.current
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
                                    <Grid container spacing={0}>
                                        <Grid item xs={4} container spacing={2}>
                                            <Grid item xs={12}>
                                                <ButtonBase onClick={this.showImage}>
                                                    <Avatar>
                                                        {this.state.marketplaceImage ?
                                                            <Image
                                                                src={`${Endpoints.images}/${this.state.marketplaceImage}`}></Image>
                                                            :
                                                            <AddPhotoAlternateIcon></AddPhotoAlternateIcon>
                                                        }
                                                    </Avatar>
                                                </ButtonBase>
                                                <Popover
                                                    open={Boolean(this.state.imageButton)}
                                                    anchorEl={this.state.imageButton}
                                                    onClose={this.closeImage}
                                                    anchorOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    }}
                                                >
                                                    <Card>
                                                        <CardHeader title={"Open Space Marketplace"}>
                                                        </CardHeader>
                                                        <CardContent>
                                                            {this.state.marketplaceImage ?
                                                                <Image
                                                                    src={`${Endpoints.images}/${this.state.marketplaceImage}`}></Image>
                                                                :
                                                                <CardMedia
                                                                    component="img"
                                                                    height="194"
                                                                    image="/no_image.png"
                                                                    alt="No image yet"
                                                                />
                                                            }
                                                        </CardContent>
                                                        <CardActions>
                                                            <label htmlFor="upload-photo">
                                                                <input
                                                                    style={{display: "none"}}
                                                                    id="upload-photo"
                                                                    name="upload-photo"
                                                                    type="file"
                                                                    accept={".png,.jpg"}
                                                                    onChange={this.handleImageUpload}
                                                                />
                                                                <Fab color="primary" size="small" component="span"
                                                                     aria-label="add">
                                                                    <AddPhotoAlternateIcon/>
                                                                </Fab>
                                                            </label>
                                                        </CardActions>
                                                    </Card>
                                                </Popover>
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
                                                <Grid item xs={6}>
                                                    <Typography
                                                        color='text.secondary'>{this.state.os.startDate.format("DD.MM.YYYY")}</Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography
                                                        color='text.secondary'>{this.state.os.endDate.format("DD.MM.YYYY")}</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid item>
                                                <IconButton aria-label="edit" onClick={this.showEdit}>
                                                    <EditIcon/>
                                                </IconButton>
                                                <OpenSpaceEditDialog isOpen={this.state.editOpen}
                                                                     onClose={this.closeEdit}
                                                                     onSave={this.save} os={this.state.os}/>
                                                <IconButton aria-label="delete" onClick={this.remove}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Grid>
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