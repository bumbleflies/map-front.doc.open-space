import React from "react";
import {Divider, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {useNavigate, useSubmit} from "react-router-dom";
import {useBackendAuth} from "../auth/hooks";


type OsImageMenuProps = {
    menu: {
        close: () => void
        anchor: null | HTMLElement
    }
    selected: string | null
}

export const OsSessionsMenu = ({selected, menu}: OsImageMenuProps) => {
    const actionSubmit = useSubmit()
    const navigate = useNavigate()
    const {withAccessToken} = useBackendAuth()

    const deleteSession = () => {
        menu.close()
        withAccessToken().then((accessToken) => actionSubmit({token: accessToken!}, {
            method: 'delete',
            encType: "application/json",
            action: selected!
        }))
    }

    const editSession = () => {
        menu.close()
        navigate(`${selected}/edit`)
    }
    return (
        <>
            <Menu
                id="session-action-menu"
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
                <MenuItem data-testid={"os-session-menu-edit"} onClick={editSession}>
                    <ListItemIcon>
                        <EditIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Edit Session
                    </ListItemText>
                </MenuItem>
                <Divider></Divider>
                <MenuItem data-testid={"os-session-menu-delete"} onClick={deleteSession}>
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