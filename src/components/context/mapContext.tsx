import React, {createContext, useState} from 'react';
import {Map} from "leaflet";

export type  MapContextType = {
    map: Map | null,
    setMap: React.Dispatch<React.SetStateAction<Map | null>>
}
export const MapContext = createContext<MapContextType>({
    map: null, setMap: () => {

    }
});

type MapContextProviderProps = {
    children: React.ReactNode
}
export const MapContextProvider = ({children}: MapContextProviderProps) => {
    const [map, setMap] = useState<Map | null>(null)
    return (
        <MapContext.Provider value={{map: map, setMap: setMap}}>
            {children}
        </MapContext.Provider>
    )
}

export default MapContextProvider;
