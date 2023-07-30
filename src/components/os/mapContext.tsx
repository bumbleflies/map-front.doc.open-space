import React, {createContext} from 'react';
import {Map} from "leaflet";

export type  MapContextType = {
    map: Map | null,
    setMap: React.Dispatch<React.SetStateAction<Map | null>>
}
const MapContext = createContext<MapContextType>({
    map: null, setMap: () => {

    }
});

export default MapContext;
