import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";

export const useConfirmDialog = () => {
    const [open, setOpen] = useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return {isOpen:open, onClickOpen:handleClickOpen, onClose: handleClose}

}

type ConfirmDialogProps = {
    title: string,
    description: string|React.ReactNode,
    dialog: {
        open: boolean,
        onConfirm: () => void
        onClose: () => void,
        buttons: {
            cancel: string,
            confirm: string
        }
    }
}

export default function ConfirmDialog({title, description, dialog}: ConfirmDialogProps) {

    return (
        <>
            <Dialog
                open={dialog.open}
                onClose={dialog.onClose}
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-description"
            >
                <DialogTitle id="confirm-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="confirm-dialog-description">
                        {description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={dialog.onClose} color={"primary"} data-testid={"confirm-dialog-cancel-button"}>
                        {dialog.buttons.cancel}
                    </Button>
                    <Button onClick={dialog.onConfirm} autoFocus color={"secondary"}
                            data-testid={"confirm-dialog-confirm-dialog"}>
                        {dialog.buttons.confirm}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
