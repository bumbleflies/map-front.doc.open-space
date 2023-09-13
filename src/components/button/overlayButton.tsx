import {Button, Fab} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import React, {ChangeEvent} from "react";

type OverlayButtonType = {
    onImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
    display: boolean
}
export const OverlayButton = ({display, onImageUpload}: OverlayButtonType) => {
    return (
        <Button
            sx={{
                position: "fixed",
                display: display ? 'block' : 'none',
                transform: 'translate(330px,-50px)'
            }}
        >
            <label htmlFor="upload-photo">
                <input
                    style={{display: "none"}}
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    accept={".png,.jpg"}
                    onChange={onImageUpload}
                />
                <Fab color="primary" size="medium" component="span"
                     aria-label="add">
                    <AddPhotoAlternateIcon/>
                </Fab>
            </label>
        </Button>
    );
};