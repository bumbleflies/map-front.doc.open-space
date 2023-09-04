import {IconButton, ImageList, ImageListItem, ImageListItemBar, ListItemButton, Skeleton} from "@mui/material";
import React, {useEffect, useState} from "react";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {useFetcher, useLoaderData, useNavigate, useParams} from "react-router-dom";
import {Endpoints} from "../../config/Endpoints";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {ImageWithDetailsType} from "../../types/image";
import {OsImpressionsAddDialog} from "./osImpressionsAddDialog";
import {OsImpressionsMenu} from "./osImpressionsMenu";
import {ImageApiServices as imageApi} from "../../api/imageApi";

export const OsImpressionsTab = () => {
    const images = useLoaderData() as ImageWithDetailsType[]
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
    const [editOpen, setEditOpen] = useState<boolean>(false)
    const [pendingImages, setPendingImages] = useState<string[]>([])

    const imageUploadFetcher = useFetcher()
    const navigate = useNavigate()
    const {os_id} = useParams<"os_id">();

    useEffect(() => {
        if (Boolean(imageUploadFetcher.data)) {
            console.log('make skeletons for pending images: ' + JSON.stringify(imageUploadFetcher.data))
            setPendingImages(imageUploadFetcher.data)
        }
    }, [imageUploadFetcher.data, setPendingImages])

    const openMenu = (event: React.MouseEvent<HTMLButtonElement>, imageIdentifier: string) => {
        setMenuAnchorEl(event.currentTarget);
        setSelectedImage(imageIdentifier)
    };

    const closeMenu = () => {
        setMenuAnchorEl(null);
        setSelectedImage(null)
    }

    const uploadFile = (file: File) => {
        return imageApi.upload({
            osIdentifier: os_id!,
            imageFile: file
        })
    }

    return (
        <>
            <ImageList>
                <ImageListItem key={"image-add"} sx={{
                    alignItems: "center",
                    verticalAlign: "middle",
                }}>
                    <ListItemButton data-testid={"os-image-add-button"} onClick={() => setEditOpen(true)} sx={{
                        minHeight: 150
                    }}>
                        <AddPhotoAlternateIcon fontSize={"large"}/>
                    </ListItemButton>
                    <OsImpressionsAddDialog isOpen={editOpen} closeHandler={() => setEditOpen(false)}
                                            submit={imageUploadFetcher.submit} upload={uploadFile}/>
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
                            title={image.description}
                            subtitle={image.imageIdentifier}
                            actionIcon={
                                <IconButton
                                    data-testid={"os-image-menu"}
                                    sx={{color: 'white'}}
                                    aria-label={`Open Space impression ${image.description}`}
                                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => openMenu(event, image.imageIdentifier)}
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
            <OsImpressionsMenu anchorElement={menuAnchorEl} imageId={selectedImage} closeMenuHandler={closeMenu}/>
        </>
    )
}