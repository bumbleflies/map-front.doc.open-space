import React from "react";
import {SnackbarProvider} from "material-ui-snackbar-provider";
import AlertSnackbar from "./components/snack/alertSnackbar";
import AuthProvider from "./components/auth/provider";
import ReactGoogleMapLoader from "react-google-maps-loader";

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
                <ReactGoogleMapLoader
                    params={{
                        key: process.env.REACT_APP_GOOGLE_API_KEY!,
                        libraries: "places,geocode",
                    }} render={() => children}/>
            </AuthProvider>
        </SnackbarProvider>
    )
}
