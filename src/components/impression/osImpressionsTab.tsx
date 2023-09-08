import {IconButton, ImageList, ImageListItem, ImageListItemBar, ListItemButton, Skeleton} from "@mui/material";
import React, {useState} from "react";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {useLoaderData, useNavigate, useParams, useSubmit} from "react-router-dom";
import {Endpoints} from "../../config/Endpoints";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {ImageWithDetailsType} from "../../types/image";
import {OsImageAddDialog} from "./osImageAddDialog";
import {OsImpressionsMenu} from "./osImpressionsMenu";
import {ImageApiServices} from "../../api/imageApi";
import {useImageUploadFetcher} from "../../helper/imageUploadFetcher";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import {useSelectionMenu} from "../image/menu";

export const OsImpressionsTab = () => {
    const images = useLoaderData() as ImageWithDetailsType[]
    const [uploadOpen, setUploadOpen] = useState<boolean>(false)
    const {pendingImages, imageSubmit} = useImageUploadFetcher()

    const {menu,selected} = useSelectionMenu()

    const navigate = useNavigate()
    const {os_id} = useParams<"os_id">();

    const actionSubmit = useSubmit()

    const uploadFile = (file: File) => {
        return ImageApiServices.upload({
            osIdentifier: os_id!,
            imageFile: file
        })
    }

    const makeImageHeader = (imageId: string) => {
        menu.close()
        actionSubmit({is_header: true}, {
            method: 'patch',
            action: `${imageId}/make_header`
        })
    }


    return (
        <>
            <ImageList>
                <ImageListItem key={"image-add"} sx={{
                    alignItems: "center",
                    verticalAlign: "middle",
                }}>
                    <ListItemButton data-testid={"os-impression-image-add-button"} onClick={() => setUploadOpen(true)}
                                    sx={{
                                        minHeight: 150
                                    }}>
                        <AddPhotoAlternateIcon fontSize={"large"}/>
                    </ListItemButton>
                    <OsImageAddDialog title={"Add Impressions"} isOpen={uploadOpen}
                                      closeHandler={() => setUploadOpen(false)}
                                      submit={imageSubmit} upload={uploadFile}/>
                    <ImageListItemBar {...images.length === 0 ? {title: "no images yet"} : null}
                                      subtitle={"click to add impressions"}/>

                </ImageListItem>
                {images.map((image) => (
                    <ImageListItem key={image.imageIdentifier}>
                        <img onClick={() => navigate(image.imageIdentifier)}
                             src={Endpoints.openSpaceImage(image)}
                             alt={image.imageIdentifier}
                             loading="lazy"
                             data-testid={"os-image"}
                        />
                        <ImageListItemBar
                            position="top"
                            actionPosition="left"
                            actionIcon={
                                <IconButton
                                    data-testid={"os-image-make-header-menu"}
                                    sx={{color: 'white'}}
                                    aria-label={'Make header image'}
                                    onClick={() => makeImageHeader(image.imageIdentifier)}
                                >
                                    {image.isHeader? <StarIcon />
                                        :
                                    <StarBorderIcon/>}
                                </IconButton>
                            }>
                        </ImageListItemBar>

                        <ImageListItemBar
                            title={image.description}
                            subtitle={image.imageIdentifier}
                            actionIcon={
                                <IconButton
                                    data-testid={"os-image-menu"}
                                    sx={{color: 'white'}}
                                    aria-label={`Open Space impression ${image.description}`}
                                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => menu.open(event, image.imageIdentifier)}
                                >
                                    <KeyboardArrowUpIcon/>
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
            <OsImpressionsMenu menu={menu} selected={selected}/>
        </>
    )
}