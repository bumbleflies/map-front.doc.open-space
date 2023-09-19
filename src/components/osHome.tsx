import React from "react";
import {AppBar, Avatar, Box, Grid, IconButton, Link, Paper, Toolbar, Typography} from "@mui/material";
import {Image} from "mui-image";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {StyledFab} from "./button/styledFab";
import {yellow} from '@mui/material/colors'
import UserProfileActions from "./auth/userProfileActions";

type OpenSpaceHarvesterHomeProps = {
    actionFab?: React.ReactElement<typeof StyledFab>,
    rightIconButton?: React.ReactElement<typeof IconButton>,
    mainPage: React.ReactNode
}

export const OpenSpaceHarvesterHome = ({actionFab, rightIconButton, mainPage}: OpenSpaceHarvesterHomeProps) => {
    const navigate = useNavigate();
    const location = useLocation()

    function shouldDrawFab() {
        // dirty hack to hide FAB when image is displayed
        return location.pathname.split('/').length < 5 || location.pathname.split('/').pop() === '';
    }

    return (
        <Paper sx={{height: '100vh'}}>
            <AppBar id={"appbar"} position={"fixed"} sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <Toolbar>
                    <Avatar onClick={() => navigate('/')} data-testid={"navigate-home"}>
                        <Image src={"/img/bumblefly-blue.png"}></Image>
                    </Avatar>

                    <Box sx={{flexGrow: 1}}/>

                    <Typography component="h1" variant="h4">
                        Open Space Harvest
                    </Typography>

                    <Box sx={{flexGrow: 1}}/>
                    <UserProfileActions/>
                </Toolbar>
            </AppBar>

            {mainPage}

            <Outlet/>

            <AppBar position="sticky" color="primary" >
                <Toolbar>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography>made with ❤️ by 🐝🦋
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Link href={'https://bumbleflies.de'} target={"_blank"}
                                  color={yellow[700]}>bumbleflies</Link>
                        </Grid>
                    </Grid>
                    <Box sx={{flexGrow: 1}}/>
                    {shouldDrawFab() ?
                        actionFab : null}
                    <Box sx={{flexGrow: 1}}/>
                    {rightIconButton}
                </Toolbar>
            </AppBar>
        </Paper>
    )
}