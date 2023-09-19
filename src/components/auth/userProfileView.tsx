import {useAuth0} from "@auth0/auth0-react";
import {OpenSpaceHarvesterHome} from "../osHome";
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Container,
    Paper,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";

import AccountBoxIcon from '@mui/icons-material/AccountBox';

const UserProfileCard = () => {
    const {user} = useAuth0()
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
                    <CardHeader subheader={user?.email} />
                    <CardContent>
                        <TextField
                            fullWidth={true}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Your name"
                            variant="standard"
                            defaultValue={user?.name}
                        />
                    </CardContent>
                    <CardMedia src={user?.profile}></CardMedia>
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