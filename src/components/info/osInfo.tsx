import React from "react";
import {MarkerWithImage} from "../../types/marker";
import {Box, ButtonBase, CardMedia, Divider, Grid, Typography} from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightlightIcon from "@mui/icons-material/Nightlight";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TagIcon from '@mui/icons-material/Tag';
import {IconTextGrid} from "./iconTextGrid";
import {Endpoints} from "../../config/Endpoints";
import {MenuActionButton} from "../button/menuActionButton";
import {Outlet, useLoaderData, useNavigate, useSubmit} from "react-router-dom";
import {ImageType} from "../../types/image";


export const OpenSpaceInfo = () => {
    const infoMarker = useLoaderData() as MarkerWithImage
    const navigate = useNavigate()
    const deleteSubmit = useSubmit();

    const deleteMarker = () => {
        deleteSubmit({}, {
            method: 'delete',
            action: `/os/${infoMarker.identifier}`
        })
    }

    return (
        <Box sx={{}}>
            <Grid container spacing={0} alignItems={"center"}>
                {/* Image */}
                <Grid item xs={12} textAlign={"center"}>
                    <ButtonBase data-testid={"os-images-button"} onClick={() => navigate(`i/`)}>
                        {infoMarker.isAvailable ?
                            <CardMedia
                                component="img"
                                height="300"
                                image={Endpoints.openSpaceImage((infoMarker as ImageType))}
                                alt={`Image ${(infoMarker as ImageType).imageIdentifier} in Open Space ${infoMarker.identifier}`}
                            />
                            :
                            <CardMedia
                                component="img"
                                image={'/img/no-image-icon.png'}
                                alt={'no image yet available'}
                            />

                        }
                    </ButtonBase>
                </Grid>
                {/* Title */}
                <Grid item xs={12}>
                    <Box sx={{p: 2}}>
                        <Typography data-testid={'os-title'} variant={"h6"}>{infoMarker.title}</Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} container>
                    <Box sx={{py: 2, flexGrow: 1}}>
                        <Divider/>
                    </Box>
                </Grid>
                <Grid item xs={12} container>
                    <Grid item xs={4}/>
                    <MenuActionButton onClickHandler={() => navigate(`edit`)}
                                      icon={<EditIcon/>} name={"Edit"}/>
                    <MenuActionButton onClickHandler={deleteMarker} icon={<DeleteIcon/>} name={"Delete"}/>
                    <Grid item xs={4}/>
                </Grid>
                <Grid item xs={12} container>
                    <Box sx={{py: 2, flexGrow: 1}}>
                        <Divider/>
                    </Box>
                </Grid>
                {/* Dates */}
                <IconTextGrid name={'start date'} icon={<WbSunnyIcon/>}
                              text={infoMarker.startDate.format("DD.MM.YYYY - HH:mm ")}/>
                <IconTextGrid name={'end date'} icon={<NightlightIcon/>}
                              text={infoMarker.endDate.format("DD.MM.YYYY - HH:mm ")}/>
                <IconTextGrid name={'position'} icon={<LocationOnIcon/>}
                              text={`${infoMarker.position.lat}, ${infoMarker.position.lng}`}/>
                <IconTextGrid name={'identifier'} icon={<TagIcon/>} text={infoMarker.identifier}/>
            </Grid>

            <Outlet/>
        </Box>
    )
}