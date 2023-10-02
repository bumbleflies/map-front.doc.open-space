import {MarkerWithImage} from "../../types/marker";
import {Box, ButtonBase, CardMedia, Divider, Grid, IconButton, Typography} from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightlightIcon from "@mui/icons-material/Nightlight";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TagIcon from '@mui/icons-material/Tag';
import {IconTextGrid} from "./iconTextGrid";
import {Endpoints} from "../../config/Endpoints";
import {MenuActionButton} from "../button/menuActionButton";
import {Outlet, useNavigate, useSubmit} from "react-router-dom";
import {ImageType} from "../../types/image";
import {useDataFromMatcher} from "../../helper/dataFromMatcher";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog, {useConfirmDialog} from "../confirmDialog";
import {useSnackbar} from "material-ui-snackbar-provider";
import {useBackendAuth} from "../auth/hooks";


export const OsInfoTab = () => {
    const navigate = useNavigate()
    const deleteSubmit = useSubmit();

    const {showMessage} = useSnackbar()
    const infoMarker = useDataFromMatcher<MarkerWithImage>({id: 'os'})
    const {withAccessToken} = useBackendAuth()

    const deleteMarker = () => {
        withAccessToken().then((accessToken) =>
            deleteSubmit({token: accessToken!}, {
                method: 'delete',
                encType: "application/json",
                action: `/os/${infoMarker!.identifier}`
            })
        ).then(() => showMessage(`Open Space [${infoMarker!.identifier}] deleted`))
    }

    const {isOpen, onClickOpen, onClose} = useConfirmDialog()

    return (
        <>
            {infoMarker !== null ?
                <Grid container spacing={0} alignItems={"center"}>
                    {/* Image */}
                    <Grid item xs={12} textAlign={"center"}>
                        {infoMarker.isAvailable ?
                            <ButtonBase data-testid={"os-images-button"}
                                        onClick={() => navigate(`../i/${(infoMarker as ImageType).imageIdentifier}`)}>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={Endpoints.openSpaceImage((infoMarker as ImageType), "header")}
                                    alt={`Image ${(infoMarker as ImageType).imageIdentifier} in Open Space ${infoMarker.identifier}`}
                                />
                            </ButtonBase>
                            :
                            <ButtonBase data-testid={"os-images-button"} onClick={() => navigate(`../i`)}>
                                <CardMedia
                                    component="img"
                                    image={'/img/no-image-icon.png'}
                                    alt={'no image available yet'}
                                />
                            </ButtonBase>
                        }
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
                        <Grid item xs={4}/>
                    </Grid>
                    <Grid item xs={12} container>
                        <Box sx={{py: 2, flexGrow: 1}}>
                            <Divider/>
                        </Box>
                    </Grid>
                    {/* Dates */}
                    <IconTextGrid name={'start date'} icon={<WbSunnyIcon/>}
                                  text={infoMarker.startDate.format("DD.MM.YYYY - HH:mm")}/>
                    <IconTextGrid name={'end date'} icon={<NightlightIcon/>}
                                  text={infoMarker.endDate.format("DD.MM.YYYY - HH:mm")}/>
                    <IconTextGrid name={'position'} icon={<LocationOnIcon/>}
                                  text={infoMarker.position.place}/>
                    <IconTextGrid name={'identifier'} icon={<TagIcon/>} text={infoMarker.identifier}/>
                    <Grid item xs={12} container>
                        <Box sx={{py: 2, flexGrow: 1}}>
                            <Divider/>
                        </Box>
                    </Grid>
                    <IconButton onClick={onClickOpen} id={"os-delete"} data-testid={"os-delete-button"}>
                        <DeleteIcon/>
                    </IconButton>
                    <ConfirmDialog title={"Heads up!"}
                                   description={`Are your sure you want to delete ${infoMarker.title}`}
                                   dialog={{
                                       open: isOpen,
                                       onClose: onClose,
                                       onConfirm: deleteMarker,
                                       buttons: {cancel: 'abort', confirm: 'confirm'}
                                   }}/>
                </Grid>
                : null}
            <Outlet/>

        </>
    )
}