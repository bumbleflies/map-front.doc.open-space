import MapContextProvider from "../context/mapContext";
import {OpenSpaceHarvesterHome} from "../osHome";
import {AddMarkerFab} from "../button/addMarkerFab";
import {LocatorButton} from "../button/locatorButton";
import {OpenSpaceMap} from "./osMap";

export const OsMapView = () => {
    return (
        <MapContextProvider>
            <OpenSpaceHarvesterHome actionFab={<AddMarkerFab/>}
                                    rightIconButton={<LocatorButton/>}
                                    mainPage={<OpenSpaceMap/>}/>
        </MapContextProvider>
    )
}