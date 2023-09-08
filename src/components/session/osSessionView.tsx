import {useLoaderData, useNavigate, useSubmit} from "react-router-dom";
import {
    Box,
    ButtonBase,
    Divider,
    Grid,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    ListItemButton,
    Skeleton,
    Typography
} from "@mui/material";
import {IconTextGrid} from "../info/iconTextGrid";
import {OsSessionWithImages} from "../../types/session";
import React, {useEffect, useState} from "react";
import TimelapseIcon from '@mui/icons-material/Timelapse';
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {OsImageAddDialog} from "../impression/osImageAddDialog";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {SessionImageApiServices} from "../../api/sessionImageApi";
import {Endpoints} from "../../config/Endpoints";
import {useImageUploadFetcher} from "../../helper/imageUploadFetcher";
import DeleteIcon from "@mui/icons-material/Delete";

export const OsSessionView = () => {
    const session = useLoaderData() as OsSessionWithImages

    const [uploadOpen, setUploadOpen] = useState<boolean>(false)
    const {pendingImages, imageSubmit} = useImageUploadFetcher()
    const deleteSubmit=useSubmit()
    const navigate = useNavigate()

    const [title, setTitle] = useState<string>('');
    const [timeInfo, setTimeInfo] = useState<string>('')

    useEffect(() => {
        setTitle(session.title)
        setTimeInfo(`${session.startDate.format("DD.MM.YYYY - HH:mm")} - ${session.endDate.format('HH:mm')}`)
    }, [session, setTitle, setTimeInfo])


    const uploadFile = (file: File) => {
        return SessionImageApiServices.upload({
            ...session,
            imageFile: file
        })
    }

    const deleteImage = (imageIdentifier: string) => {
        console.log(`deleting ${imageIdentifier}`)
        imageSubmit({}, {method: 'delete', action: imageIdentifier})
    }

    return (
        <>
            <Grid container spacing={0} alignItems={"center"}>
                <Grid item xs={1}>
                    <ButtonBase data-testid={"os-session-back-button"} aria-label={"back"}
                                onClick={() => navigate(`/os/${session.osIdentifier}/s`)}>
                        <ArrowBackIcon/>
                    </ButtonBase>
                </Grid>
                {/* Title */}
                <Grid item xs={11}>
                    <Box sx={{p: 2}}>
                        <Typography data-testid={'os-session-title'} variant={"h6"}>{title}</Typography>
                    </Box>
                </Grid>
                {/* Dates */}
                <IconTextGrid name={'session runtime'} icon={<TimelapseIcon/>} text={timeInfo}/>
                <Grid item xs={12} container>
                    <Box sx={{py: 2, flexGrow: 1}}>
                        <Divider/>
                    </Box>
                </Grid>
            </Grid>
            <ImageList>
                <ImageListItem key={"session-image-add"} sx={{
                    alignItems: "center",
                    verticalAlign: "middle",
                }}>
                    <ListItemButton data-testid={"os-session-image-add-button"}
                                    onClick={() => setUploadOpen(true)}
                                    sx={{
                                        minHeight: 150
                                    }}>
                        <AddPhotoAlternateIcon fontSize={"large"}/>
                    </ListItemButton>
                    <OsImageAddDialog title={"Add session images"} isOpen={uploadOpen}
                                      closeHandler={() => setUploadOpen(false)}
                                      submit={imageSubmit} upload={uploadFile}/>
                    <ImageListItemBar subtitle={"add session images"}/>
                </ImageListItem>
                {session.images.map((image) => (
                    <ImageListItem key={image.imageIdentifier} data-testid={"os-session-image"}>
                        <img onClick={() => navigate(image.imageIdentifier)}
                             src={Endpoints.openSpaceSessionImage(image)}
                             alt={image.imageIdentifier}
                             loading="lazy"
                             data-testid={"os-image"}
                        />
                        <ImageListItemBar
                            subtitle={image.imageIdentifier}
                            actionIcon={
                                <IconButton
                                    data-testid={"os-session-image-delete"}
                                    sx={{color: 'white'}}
                                    aria-label={`Session image ${image.imageIdentifier}`}
                                    onClick={() => deleteImage(image.imageIdentifier)}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                ))}
                {pendingImages.map((image) => (
                    <ImageListItem key={image}>
                        <Skeleton variant="rectangular" width={170} height={150}/>
                        <ImageListItemBar title={image}/>
                    </ImageListItem>
                ))}
            </ImageList>
        </>
    )
}