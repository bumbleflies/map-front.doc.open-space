import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useLoaderData, useNavigate, useSubmit} from "react-router-dom";
import {ImageWithDetailsType} from "../../types/image";

export const OsImageEditDialog = () => {
    const imageDetails = useLoaderData() as ImageWithDetailsType;
    const navigate = useNavigate()

    const [description, setDescription] = useState<string>('')
    const imageEditSubmit = useSubmit()

    useEffect(() => {
        setDescription(imageDetails.description)
    }, [imageDetails, setDescription])

    const closeImageEdit = () => {
        navigate('../..')
    }
    const saveImageEdit = () => {
        imageEditSubmit({description: description},
            {
                method: 'POST',
                encType: "application/json"
            }
        )
    }
    return (
        <Dialog open={true}>
            <DialogTitle>Describe your image</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Whats the image about?
                </DialogContentText>
                <TextField
                    inputProps={{"data-testid": "image-edit-description"}}
                    fullWidth={true}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Image description"
                    variant="standard"
                    value={description}
                    onChange={v => setDescription(v.target.value)}
                />

            </DialogContent>
            <DialogActions>
                <Button data-testid='image-edit-cancel' onClick={closeImageEdit}>Cancel</Button>
                <Button data-testid='image-edit-save' onClick={saveImageEdit}>Update</Button>
            </DialogActions>
        </Dialog>
    )
}
