import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import React from "react";

export const OsImageEditDialog = () => {
    const closeImageEdit = () => {

    }
    const saveImageEdit = () => {

    }

    console.log('OsImageEdit')

    const description = "test"
    return (
        <Dialog open={true}>
            <DialogTitle>Describe your image</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Whats the image about?
                </DialogContentText>
                <TextField
                    inputProps={{"data-testid": "image-edit-description"}}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Image description"
                    fullWidth
                    variant="standard"
                    defaultValue={description}
                    onChange={v => console.log(v.target.value)}
                />

            </DialogContent>
            <DialogActions>
                <Button data-testid='image-edit-cancel' onClick={closeImageEdit}>Cancel</Button>
                <Button data-testid='image-edit-save' onClick={saveImageEdit}>Update</Button>
            </DialogActions>
        </Dialog>
    )
}
