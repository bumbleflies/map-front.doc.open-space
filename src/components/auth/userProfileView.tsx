import {Avatar, Button, Card, CardActions, CardContent, CardHeader, Dialog, TextField} from "@mui/material";

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import React, {useContext, useEffect, useState} from "react";
import {useSnackbar} from "material-ui-snackbar-provider";
import {useRedirectIfNotAuthenticated} from "./hooks";
import {useNavigate} from "react-router-dom";
import {UserMetadataContext, UserMetadataContextType} from "./context";

const UserProfileCard = () => {
    const [userName, setUserName] = useState<string>('')
    const {userMetadataName, updateUserMetadataName, user} = useContext<UserMetadataContextType>(UserMetadataContext)
    const {showMessage} = useSnackbar()
    const navigate = useNavigate()

    useRedirectIfNotAuthenticated()

    useEffect(() => {
        if (userMetadataName !== null) {
            setUserName(userMetadataName);
        }
    }, [userMetadataName]);


    const updateAuth0UserName = () => {
        if (userName !== userMetadataName) {
            updateUserMetadataName(userName)
                .then(() => {
                    showMessage(`Updated profile name to ${userName}`)
                })
        }
    }

    function cancel() {
        navigate('/')
    }

    return (
        <>
            <Dialog open={true}>
                <Card sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <CardContent>
                        <Avatar><AccountBoxIcon/></Avatar>
                    </CardContent>
                    <CardHeader title={"Edit Profile"}/>
                    <CardHeader subheader={user?.email}/>
                    <CardContent>
                        <TextField
                            inputProps={{"data-testid": "user-profile-edit-name"}}
                            fullWidth={true}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Your name"
                            variant="standard"
                            value={userName}
                            onChange={v => setUserName(v.target.value)}
                        />
                    </CardContent>
                    <CardActions>
                        <Button data-testid={'user-profile-edit-cancel'}
                                onClick={cancel} color={"secondary"}>Cancel</Button>
                        <Button data-testid={'user-profile-edit-save'} onClick={updateAuth0UserName}>Save</Button>
                    </CardActions>
                </Card>
            </Dialog>
        </>
    )
}

export const UserProfileView = () => {
    return (
        <UserProfileCard/>
    )
}