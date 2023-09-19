import {useAuth0} from "@auth0/auth0-react";
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
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSnackbar} from "material-ui-snackbar-provider";
import {Auth0ApiService} from "../../api/auth0Api";

export const useUserMetadata = () => {
    const {isAuthenticated, getAccessTokenSilently, user} = useAuth0()
    const [authService] = useState<Auth0ApiService>(new Auth0ApiService())
    const [userMetadataName, setUserMetadataName] = useState<string>('')

    useEffect(() => {
        if (isAuthenticated && user) {
            getAccessTokenSilently().then((accessToken) =>
                authService.getUserMetadataName(user, accessToken).then((name) => {
                    setUserMetadataName(name)
                })
            )
        }
    }, [setUserMetadataName, isAuthenticated, user, getAccessTokenSilently, authService]);

    const updateUserMetadataName = async (newName: string) => {
        return getAccessTokenSilently().then((accessToken) =>
            authService.updateUserMetadataName(user!, newName, accessToken)
                .then(() => {
                    setUserMetadataName(newName)
                }))
    }

    return {userMetadataName: userMetadataName, updateUserMetadataName: updateUserMetadataName, user: user}
}

const useRedirectIfNotAuthenticated = () => {
    const {isAuthenticated, isLoading} = useAuth0()
    const navigate = useNavigate()
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate('/')
        }
    }, [navigate, isAuthenticated, isLoading]);

}

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
            <UserProfileCard/></Paper>}/>
    )
}