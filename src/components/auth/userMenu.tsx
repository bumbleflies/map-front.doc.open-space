import {useAuth0} from "@auth0/auth0-react";
import {useSelectionMenu} from "../image/menu";
import {useLocation, useNavigate} from "react-router-dom";
import {
    Avatar,
    Card,
    CardActions,
    CardHeader,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Popover
} from "@mui/material";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import {Logout} from "@mui/icons-material";

export const UserMenu = () => {
    const {user, logout} = useAuth0()
    const {menu} = useSelectionMenu()
    const location = useLocation()
    const navigate = useNavigate()
    const doLogout = () => {
        menu.close()
        return logout({
            logoutParams: {
                returnTo: window.location.origin + `/redirect?next=${location.pathname}`
            }
        })
    }

    const gotoProfile = () => {
        return navigate(`/u/me`)
    }

    return (
        <>
            <Avatar alt={user?.name} src={user?.profile}
                    onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                        menu.open(event, user?.sub!)
                    }}>
            </Avatar>
            <Popover
                id="session-action-menu"
                anchorEl={menu.anchor}
                open={Boolean(menu.anchor)}
                onClose={menu.close}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                <Card>
                    <CardHeader avatar={<Avatar alt={user?.name} src={user?.profile}> </Avatar>}
                                title={user?.name}
                                subheader={user?.email}
                    />
                    <CardActions>
                        <List sx={{width: '100%'}}>
                            <Divider></Divider>
                            <ListItemButton onClick={gotoProfile}>
                                <ListItemIcon>
                                    <PersonIcon fontSize="small"/>
                                </ListItemIcon>
                                <ListItemText secondary={'Profile'}/>
                            </ListItemButton>
                            <Divider></Divider>
                            <ListItemButton onClick={doLogout}>
                                <ListItemIcon>
                                    <Logout fontSize="small"/>
                                </ListItemIcon>
                                <ListItemText secondary={'Logout'}/>
                            </ListItemButton>
                        </List>
                    </CardActions>
                </Card>
            </Popover>
        </>
    )
}