import React from "react";
import {Divider, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {useNavigate, useSubmit} from "react-router-dom";


type OsImageMenuProps = {
    menu:{
        close:()=>void
        anchor:null | HTMLElement
    }
    selected:string|null
}

export const OsSessionsMenu = (props: OsImageMenuProps) => {
    const actionSubmit = useSubmit()
    const navigate = useNavigate()

    const deleteSession = () => {
        props.menu.close()
        actionSubmit({}, {
            method: 'delete',
            action: props.selected!
        })
    }

    const editSession = () => {
        props.menu.close()
        navigate(`${props.selected}/edit`)
    }
    return (
        <>
            <Menu
                id="session-action-menu"
                anchorEl={props.menu.anchor}
                open={Boolean(props.menu.anchor)}
                onClose={props.menu.close}
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