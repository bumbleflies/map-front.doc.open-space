import MapContextProvider from "../context/mapContext";
import {OpenSpaceHarvesterHome} from "../osHome";
import {SnackbarProvider} from "material-ui-snackbar-provider";
import {AddMarkerFab} from "../button/addMarkerFab";
import {LocatorButton} from "../button/locatorButton";
import {OpenSpaceMap} from "./osMap";
import {AlertSnackbar} from "../snack/alertSnackbar";

export const OsMapView = () => {
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
            <MapContextProvider>
                <OpenSpaceHarvesterHome actionFab={<AddMarkerFab/>}
                                        rightIconButton={<LocatorButton/>}
                                        mainPage={<OpenSpaceMap/>}/>
            </MapContextProvider>
        </SnackbarProvider>
    )
}