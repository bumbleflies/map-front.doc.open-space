import {OpenSpaceHarvesterHome} from "../osHome";
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Container,
    Paper,
    TextField,
    Toolbar
} from "@mui/material";

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import React, {useEffect, useState} from "react";
import {useSnackbar} from "material-ui-snackbar-provider";
import {useRedirectIfNotAuthenticated, useUserMetadata} from "./hooks";

const UserProfileCard = () => {
    const [userName, setUserName] = useState<string>('')
    const {userMetadataName, updateUserMetadataName, user} = useUserMetadata()
    const {showMessage} = useSnackbar()

    useRedirectIfNotAuthenticated()

    useEffect(() => {
        setUserName(userMetadataName);
    }, [userMetadataName]);


    const updateAuth0UserName = () => {
        if (userName !== userMetadataName) {
            updateUserMetadataName(userName)
                .then(() => {
                    showMessage(`Updated profile name to ${userName}`)
                })
        }
    }

    return (
        <>
            <Toolbar/>
            <Container component={"main"} maxWidth={"xs"}>
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
                        <Button onClick={() => setUserName(userMetadataName)} color={"secondary"}>Cancel</Button>
                        <Button onClick={updateAuth0UserName}>Save</Button>
                    </CardActions>
                </Card>
            </Container>
        </>
    )
}

export const UserProfileView = () => {
    return (
        <OpenSpaceHarvesterHome mainPage={<Paper sx={{height: '90vh', backgroundColor: 'grey'}} color={"grey"}>
            <UserProfileCard/>
        </Paper>}/>
    )
}