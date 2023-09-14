import {Drawer, SwipeableDrawer, Toolbar} from "@mui/material"
import React, {useEffect, useState} from "react";
import useOnMobile from "../../helper/onMobileHook";

type DrawerProps = {
    children: React.ReactNode,
    onCloseHandler: () => void
}
const DesktopDrawer = ({children, onCloseHandler}: DrawerProps) => {
    return (
        <Drawer
            variant={"permanent"}
            anchor={"left"} open={true}
            onClose={onCloseHandler}
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
            {children}
        </Drawer>
    )
}

const MobileDrawer = ({children, onCloseHandler}: DrawerProps) => {
    const [appbarHeight, setAppbarHeight] = useState<number>(56)
    useEffect(() => {
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
            onClose={onCloseHandler}
            open={true}
            PaperProps={{
                sx: {
                    height: `calc(100% - ${appbarHeight}px)`,
                },
            }}
        >
            {children}
        </SwipeableDrawer>
    )
}

export const ResponsiveDrawer = ({children, onCloseHandler}: DrawerProps) => {
    const onMobile = useOnMobile()
    return onMobile ?
        <MobileDrawer onCloseHandler={onCloseHandler}>
            {children}
        </MobileDrawer>
        :
        <DesktopDrawer onCloseHandler={onCloseHandler}>
            <Toolbar/>
            {children}
        </DesktopDrawer>
}
