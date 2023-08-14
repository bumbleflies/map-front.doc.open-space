import React from "react";
import {ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete";
import CollectionsIcon from '@mui/icons-material/Collections';
import EditIcon from "@mui/icons-material/Edit";
import {Outlet, useNavigate, useSubmit} from "react-router-dom";


type OsImageMenuProps = {
    anchorElement: HTMLElement | null,
    imageId: string | null,
    closeMenuHandler: () => void
}

export const OsImageMenu = (props: OsImageMenuProps) => {
    const actionSubmit = useSubmit()
    const navigate = useNavigate()

    const deleteImage = () => {
        props.closeMenuHandler()
        actionSubmit({}, {
            method: 'delete',
            action: `${props.imageId}`
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
                id="image-action-meu"
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
                <MenuItem onClick={makeImageHeader}>
                    <ListItemIcon>
                        <CollectionsIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Make Header
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={deleteImage}>
                    <ListItemIcon>
                        <DeleteIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Delete Image
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={editImage}>
                    <ListItemIcon>
                        <EditIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Edit Image
                    </ListItemText>
                </MenuItem>
            </Menu>
            <Outlet/>
        </>
    )
}