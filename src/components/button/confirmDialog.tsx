import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import useEventListener from "@use-it/event-listener";

type ConfirmDialogProps={
    isOpen:boolean,
    close:()=>void
    title:string,
    question:string
    confirmSubmit:() => void
}
export const ConfirmDialog = ({isOpen,close, title, question,confirmSubmit}:ConfirmDialogProps) => {


    const executeConfirm = () => {
        confirmSubmit()
        close()
    }

    function handler(event: KeyboardEvent) {
        event.preventDefault()
        if (isOpen && event.key === 'Enter') {
            executeConfirm()
        }
    }

    useEventListener('keydown', handler);

    return (
        <Dialog open={isOpen} onClose={close}>

            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {question}?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button type={"reset"} onClick={close} autoFocus color="secondary">
                    No
                </Button>
                <Button type={"submit"} onClick={executeConfirm} color="primary">
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}