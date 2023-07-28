import {createContext} from 'react';
import {OsImageNotAvailable, OsImageType} from "../../types/api";

export type  OpenSpaceImagesContextType = {
    headerImage: OsImageNotAvailable | OsImageType,
    setHeaderImage: any
}
const OpenSpaceImagesContext = createContext<OpenSpaceImagesContextType>({
    headerImage: new OsImageNotAvailable(),
    setHeaderImage: () => {
    }
})

export default OpenSpaceImagesContext;
