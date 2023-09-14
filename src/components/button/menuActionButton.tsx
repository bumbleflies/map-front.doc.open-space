import React, {useState} from "react";
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    IconButton,
    Typography
} from "@mui/material";
import {yellow} from "@mui/material/colors";
import useEventListener from "@use-it/event-listener";

type MenuActionButtonType = {
    onClickHandler: () => void,
    icon: React.JSX.Element,
    name: string
}

export const MenuActionButton = ({name, icon, onClickHandler}: MenuActionButtonType) => {

    const [confirmOpen, setConfirmOpen] = useState<boolean>(false)
    const openConfirm = () => {
        setConfirmOpen(true)
    };

    const closeConfirm = () => {
        setConfirmOpen(false)
    }

    const executeConfirm = () => {
        onClickHandler()
        closeConfirm()
    }

    function handler(event: KeyboardEvent) {
        event.preventDefault()
        if (event.key === 'Enter') {
            executeConfirm()
        }
    }

    useEventListener('keydown', handler);

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

            <Dialog open={confirmOpen} onClose={closeConfirm}>

                <DialogTitle>{"Heads up!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you really want to {name.toLowerCase()}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button type={"reset"} onClick={closeConfirm} autoFocus color="secondary">
                        No
                    </Button>
                    <Button type={"submit"} onClick={executeConfirm} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}