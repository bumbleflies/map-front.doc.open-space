import React, {useState} from "react";
import {Avatar, Grid, IconButton, Typography} from "@mui/material";
import {yellow} from "@mui/material/colors";
import {ConfirmDialog} from "./confirmDialog";

type MenuActionButtonType = {
    onClickHandler: () => void,
    icon: React.JSX.Element,
    name: string,
    withConfirm?: boolean
}

export const MenuActionButton = ({name, icon, onClickHandler, withConfirm = false}: MenuActionButtonType) => {

    const [confirmOpen, setConfirmOpen] = useState<boolean>(false)

    const openConfirm = () => {
        if (withConfirm) {
            setConfirmOpen(true)
        } else {
            onClickHandler()
        }
    };

    const closeConfirm = () => {
        setConfirmOpen(false)
    }

    return (
        <>
            <Grid item xs={2} container textAlign={"center"}>
                <Grid item xs={12}>
                    <IconButton data-testid={`os-${name.toLowerCase()}-button`} aria-label="edit"
                                onClick={openConfirm}>
                        <Avatar sx={{bgcolor: yellow[700]}}>
                            {icon}
                        </Avatar>
                    </IconButton>
                </Grid>
                <Grid item xs={12}>
                    <Typography color='text.secondary' textAlign={"center"}>
                        {name}
                    </Typography>
                </Grid>
            </Grid>
            <ConfirmDialog isOpen={confirmOpen} close={closeConfirm} title={'Heads up!'}
                           question={`Do you really want to ${name.toLowerCase()}`}
                           confirmSubmit={onClickHandler}/>
        </>
    )
}