import {Drawer, SwipeableDrawer, Toolbar, useMediaQuery} from "@mui/material"
import React, {useEffect, useState} from "react";
import {useTheme} from '@mui/material/styles';

type DrawerProps = {
    children: React.ReactNode,
    onCloseHandler: () => void
}
const DesktopDrawer = (props: DrawerProps) => {
    return (
        <Drawer
            variant={"permanent"}
            anchor={"left"} open={true}
            onClose={props.onCloseHandler}
            sx={{
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {width: '400px', boxSizing: 'border-box'},
                display: {xs: 'none', sm: 'block'}
            }}
            PaperProps={{
                sx: {
                    height: '90vh',
                    top: 0,
                },
            }}
        >
            {props.children}
        </Drawer>
    )
}

const MobileDrawer = (props: DrawerProps) => {
    const [appbarHeight, setAppbarHeight] = useState<number>(56)
    useEffect(() => {
        console.log(document.getElementById("appbar")!.clientHeight)
        setAppbarHeight(document.getElementById("appbar")!.clientHeight);
    }, [setAppbarHeight]);

    return (
        <SwipeableDrawer
            sx={{
                display: {xs: 'block', sm: 'none'}
            }}
            anchor={'bottom'}
            onOpen={() => {
            }}
            onClose={props.onCloseHandler}
            open={true}
            PaperProps={{
                sx: {
                    height: `calc(100% - ${appbarHeight}px)`,
                },
            }}
        >
            {props.children}
        </SwipeableDrawer>
    )
}

export const ResponsiveDrawer = (props: DrawerProps) => {
    const theme = useTheme()
    const onMobile = useMediaQuery(theme.breakpoints.down('sm'))
    return onMobile ? <MobileDrawer {...props}>{props.children}</MobileDrawer>
        :
        <DesktopDrawer {...props}>
            <Toolbar/>
            {props.children}
        </DesktopDrawer>
}
