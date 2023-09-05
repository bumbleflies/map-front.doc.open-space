import {useFetcher, useLoaderData, useNavigate} from "react-router-dom";
import {
    Box,
    ButtonBase,
    Divider,
    Grid,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    ListItemButton,
    Typography
} from "@mui/material";
import {IconTextGrid} from "../info/iconTextGrid";
import {OsSession} from "../../types/session";
import React, {useEffect, useState} from "react";
import TimelapseIcon from '@mui/icons-material/Timelapse';
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {OsImageAddDialog} from "../impression/osImageAddDialog";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {SessionImageApiServices} from "../../api/sessionImageApi";

export const OsSessionView = () => {
    const session = useLoaderData() as OsSession

    const [uploadOpen, setUploadOpen] = useState<boolean>(false)
    const imageUploadFetcher = useFetcher()
    const navigate = useNavigate()

    const [title, setTitle] = useState<string>('');
    const [timeInfo, setTimeInfo] = useState<string>('')

    useEffect(() => {
        setTitle(session.title)
        setTimeInfo(`${session.startDate.format("DD.MM.YYYY - HH:mm")} - ${session.endDate.format('HH:mm')}`)
    }, [session, setTitle, setTimeInfo])

    const uploadFile =  (file: File) => {
        console.log('uploading file')
        return SessionImageApiServices.upload({
            ...session,
            imageFile: file
        })
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
                                      submit={imageUploadFetcher.submit} upload={uploadFile}/>
                    <ImageListItemBar subtitle={"add session images"}/>
                </ImageListItem>
            </ImageList>
        </>
    )
}