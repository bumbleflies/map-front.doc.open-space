import React from "react";
import {Divider, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete";
import CollectionsIcon from '@mui/icons-material/Collections';
import EditIcon from "@mui/icons-material/Edit";
import {useNavigate, useSubmit} from "react-router-dom";


type OsImageMenuProps = {
    anchorElement: HTMLElement | null,
    sessionId: string | null,
    closeMenuHandler: () => void
}

export const OsSessionsMenu = (props: OsImageMenuProps) => {
    const actionSubmit = useSubmit()
    const navigate = useNavigate()

    const deleteSession = () => {
        props.closeMenuHandler()
        actionSubmit({}, {
            method: 'delete',
            action: `${props.sessionId}`
        })
    }

    const editSession = () => {
        props.closeMenuHandler()
        navigate(`${props.sessionId}/edit`)
    }
    return (
        <>
            <Menu
                id="session-action-menu"
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
                <MenuItem data-testid={"os-session-edit-menu"} onClick={editSession}>
                    <ListItemIcon>
                        <EditIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Edit Session
                    </ListItemText>
                </MenuItem>
                <Divider></Divider>
                <MenuItem data-testid={"os-session-delete-menu"} onClick={deleteSession}>
                    <ListItemIcon>
                        <DeleteIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Delete Session
                    </ListItemText>
                </MenuItem>
            </Menu>
        </>
    )
}