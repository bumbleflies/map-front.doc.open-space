import {Drawer, SwipeableDrawer, useMediaQuery} from "@mui/material"
import React from "react";
import {useTheme} from '@mui/material/styles';

type DrawerProps = {
    children: React.ReactNode,
    onCloseHandler: () => void
}
export const DesktopDrawer = (props: DrawerProps) => {
    const theme = useTheme()
    const shouldDraw = useMediaQuery(theme.breakpoints.up('sm'))
    console.log('DesktopDrawer: ' + shouldDraw)
    return shouldDraw ? (
        <Drawer
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
    ) : null
}

export const MobileDrawer = (props: DrawerProps) => {
    const theme = useTheme()
    const shouldDraw = useMediaQuery(theme.breakpoints.down('sm'))
    console.log('MobileDrawer: ' + shouldDraw)
    return shouldDraw ? (
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
                    height: '90vh',
                },
            }}
        >
            {props.children}
        </SwipeableDrawer>
    ) : null
}
