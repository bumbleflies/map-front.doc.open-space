import React from "react";
import {SnackbarProvider} from "material-ui-snackbar-provider";
import AlertSnackbar from "./components/snack/alertSnackbar";
import AuthProvider from "./components/auth/provider";

type OsProviderProps = {
    children: React.ReactNode
}
export const OsContextProvider = ({children}: OsProviderProps) => {
    return (
        <SnackbarProvider
            SnackbarComponent={AlertSnackbar}
            SnackbarProps={{
                style: {
                    marginBottom: '10vh',
                    marginRight: '-20px'
                },
                anchorOrigin: {horizontal: 'right', vertical: 'bottom'},
                autoHideDuration: 4000
            }}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </SnackbarProvider>
    )
}