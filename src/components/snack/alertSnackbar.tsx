import {Alert, Button, ButtonProps, Snackbar, SnackbarProps} from "@mui/material";

type AlertSnackbarProps = {
    message?: string;
    action?: string;
    ButtonProps?: Partial<ButtonProps>;
    SnackbarProps: Partial<SnackbarProps>;
}

export const AlertSnackbar = ({message, SnackbarProps, ButtonProps, action}: AlertSnackbarProps) => {
    return (
        <Snackbar {...SnackbarProps} >
            <Alert sx={{width: '100%'}}
                   onClose={(event: React.SyntheticEvent) => SnackbarProps.onClose!(event, 'escapeKeyDown')}>
                {message}
                {action !== undefined ?
                    <Button data-testid="status-message-button" color="inherit" size="small"
                            {...ButtonProps}>
                        {action}
                    </Button> : null}
            </Alert>
        </Snackbar>
    )
}
export default AlertSnackbar