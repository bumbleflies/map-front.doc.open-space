import {ImageList, ImageListItem, ImageListItemBar, ListItemButton} from "@mui/material"
import {OpenSpaceImageAddDialog} from "./osImageAddDialog";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {useState} from "react";
import {useFetcher} from "react-router-dom";
import {ImageNotAvailable} from "../../types/image";

export const OsImageSessionsTab = () => {
    const [editOpen, setEditOpen] = useState<boolean>(false)
    const imageUploadFetcher = useFetcher()
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
                    <OpenSpaceImageAddDialog isOpen={editOpen} closeHandler={() => setEditOpen(false)}
                                             submit={imageUploadFetcher.submit} upload={async () => new ImageNotAvailable()}/>
                    <ImageListItemBar title={"no sessions yet"}/>

                </ImageListItem>
            </ImageList>
        </>
    )
}
