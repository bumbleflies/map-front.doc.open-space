import React, {ChangeEvent, RefObject} from "react";
import {OpenSpace} from "./openSpace";
import axios from "axios";
import {
    Avatar,
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
    Popover,
    Typography
} from "@mui/material";
import {Image} from "mui-image";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import EditIcon from "@mui/icons-material/Edit";
import {OpenSpaceEditDialog} from "./dialog";
import DeleteIcon from "@mui/icons-material/Delete";
import {Marker} from "@react-google-maps/api";
import {ImageServer} from "../config/Endpoints";

const Endpoints = {
    imageUpload: ImageServer.url + '/image-upload',
    images: ImageServer.url + '/i'
}
type OpenSpaceInfoProps = {
    os: OpenSpace,
    detailsRef: RefObject<Marker>,
    removeHandler: (os: OpenSpace) => void
}
type OpenSpaceInfoState = {
    editOpen: boolean,
    os: OpenSpace,
    imageButton: HTMLButtonElement | undefined,
    marketplaceImage: string | undefined,
    detailsAnchor: Marker | undefined,
}

type OSMarketplaceImageProps = {
    marketplaceImage?: string | undefined,
    handleNewMarketplaceImage: (image: string) => void
}
const OSMarketplaceImage = (props: OSMarketplaceImageProps) => {

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        const uploadData = new FormData()
        uploadData.append('file', e.target.files[0])
        uploadData.append('fileName', e.target.files[0].name)
        console.log(`Uploading file ${uploadData} to ${Endpoints.imageUpload}`)
        axios.post(Endpoints.imageUpload, uploadData).then(response => {
            props.handleNewMarketplaceImage(response.data)
        })
    }


    return (
        <Card>
            <CardHeader title={"Open Space Marketplace"}>
            </CardHeader>
            <CardContent>
                {props.marketplaceImage ?
                    <Image
                        src={`${Endpoints.images}/${props.marketplaceImage}`}></Image>
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
                        onChange={handleImageUpload}
                    />
                    <Fab color="primary" size="small" component="span"
                         aria-label="add">
                        <AddPhotoAlternateIcon/>
                    </Fab>
                </label>
            </CardActions>
        </Card>
    )
}

export class OpenSpaceInfo extends React.Component<OpenSpaceInfoProps, OpenSpaceInfoState> {
    state = {
        editOpen: false,
        imageButton: undefined,
        marketplaceImage: undefined,
        os: this.props.os,
        detailsAnchor: undefined,
    }

    componentDidMount() {
        this.setState({
            detailsAnchor: this.props.detailsRef.current!
        })
    }

    closeEdit = () => {
        this.setState({editOpen: false})
    };
    showEdit = () => {
        this.setState({editOpen: true})
    };

    showImage = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({imageButton: e.currentTarget})
    }

    closeImage = () => {
        this.setState({imageButton: undefined})
    }

    save = (os: OpenSpace) => {
        this.setState({
            os: os,
        })
        this.closeEdit()
    }

    remove = () => {
        this.props.removeHandler(this.props.os)

    }

    setNewMarketplaceImage = (image: string) => {
        this.setState({marketplaceImage: image})
    }

    render() {
        return (
            <Grid container spacing={0}>
                <Grid item xs={4} container spacing={2}>
                    <Grid item xs={12}>
                        <ButtonBase onClick={this.showImage}>
                            <Avatar>
                                {this.state.marketplaceImage ?
                                    <Image src={`${Endpoints.images}/${this.state.marketplaceImage}`}></Image>
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
                            <OSMarketplaceImage marketplaceImage={this.state.marketplaceImage}
                                                handleNewMarketplaceImage={this.setNewMarketplaceImage}/>
                        </Popover>
                    </Grid>
                    <Grid item xs>
                        <Chip color="primary" label="running"></Chip>
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
            </Grid>)
    }


}