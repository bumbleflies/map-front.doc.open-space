import MapContextProvider from "../context/mapContext";
import {OpenSpaceHarvesterHome} from "../osHome";
import {OpenSpaceMap} from "./osMap";
import {LocatorButton} from "../button/locatorButton";
import {AddMarkerFab} from "../button/addMarkerFab";

export const OsMapView = () => {
    return (
        <MapContextProvider>
            <OpenSpaceHarvesterHome actionFab={<AddMarkerFab/>}
                                    rightIconButton={<LocatorButton/>}
                                    mainPage={<OpenSpaceMap/>}/>
        </MapContextProvider>
    )
}