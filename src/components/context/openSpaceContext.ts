import React, {createContext} from 'react';

import {ImageNotAvailable, ImageType} from "../../types/image";

export type  OpenSpaceImagesContextType = {
    headerImage: ImageNotAvailable | ImageType,
    setHeaderImage: React.Dispatch<React.SetStateAction<ImageNotAvailable | ImageType>>
}
const OpenSpaceImagesContext = createContext<OpenSpaceImagesContextType>({
    headerImage: new ImageNotAvailable(),
    setHeaderImage: () => {
    }
})

export default OpenSpaceImagesContext;
