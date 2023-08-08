import React, {createContext} from 'react';

import {OsImageNotAvailable, OsImageType} from "../../types/image";

export type  OpenSpaceImagesContextType = {
    headerImage: OsImageNotAvailable | OsImageType,
    setHeaderImage: React.Dispatch<React.SetStateAction<OsImageNotAvailable | OsImageType>>
}
const OpenSpaceImagesContext = createContext<OpenSpaceImagesContextType>({
    headerImage: new OsImageNotAvailable(),
    setHeaderImage: () => {
    }
})

export default OpenSpaceImagesContext;
