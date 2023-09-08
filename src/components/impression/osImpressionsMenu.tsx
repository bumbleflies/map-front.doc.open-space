import React from "react";
import {Divider, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete";
import CollectionsIcon from '@mui/icons-material/Collections';
import EditIcon from "@mui/icons-material/Edit";
import {useNavigate, useSubmit} from "react-router-dom";


type OsImpressionsMenuProps = {
    anchorElement: HTMLElement | null,
    imageId: string | null,
    closeMenuHandler: () => void
}

export const OsImpressionsMenu = (props: OsImpressionsMenuProps) => {
    const actionSubmit = useSubmit()
    const navigate = useNavigate()

    const deleteImage = () => {
        props.closeMenuHandler()
        actionSubmit({}, {
            method: 'delete',
            action: props.imageId!
        })
    }

    const makeImageHeader = () => {
        props.closeMenuHandler()
        actionSubmit({is_header: true}, {
            method: 'patch',
            action: `${props.imageId}/make_header`
        })
    }

    const editImage = () => {
        props.closeMenuHandler()
        navigate(`${props.imageId}/edit`)
    }
    return (
        <>
            <Menu
                id="image-action-menu"
                anchorEl={props.anchorElement}
                open={Boolean(props.anchorElement)}
                onClose={props.closeMenuHandler}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <MenuItem data-testid={"os-image-make-header-menu"} onClick={makeImageHeader}>
                    <ListItemIcon>
                        <CollectionsIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Make Header
                    </ListItemText>
                </MenuItem>
                <MenuItem data-testid={"os-image-edit-menu"} onClick={editImage}>
                    <ListItemIcon>
                        <EditIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Edit Image
                    </ListItemText>
                </MenuItem>
                <Divider></Divider>
                <MenuItem data-testid={"os-image-delete-menu"} onClick={deleteImage}>
                    <ListItemIcon>
                        <DeleteIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Delete Image
                    </ListItemText>
                </MenuItem>
            </Menu>
        </>
    )
}