import React from "react";
import {Divider, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {useNavigate, useSubmit} from "react-router-dom";


type OsImpressionsMenuProps = {
    menu: {
        close: () => void
        anchor: null | HTMLElement
    }
    selected: string | null
}

export const OsImpressionsMenu = ({selected, menu}: OsImpressionsMenuProps) => {
    const actionSubmit = useSubmit()
    const navigate = useNavigate()

    const deleteImage = () => {
        menu.close()
        actionSubmit({}, {
            method: 'delete',
            action: selected!
        })
    }

    const editImage = () => {
        menu.close()
        navigate(`${selected}/edit`)
    }
    return (
        <>
            <Menu
                id="image-action-menu"
                anchorEl={menu.anchor}
                open={Boolean(menu.anchor)}
                onClose={menu.close}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
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