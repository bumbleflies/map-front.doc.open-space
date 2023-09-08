import {useFetcher} from "react-router-dom";
import {useEffect, useState} from "react";

export const useImageUploadFetcher = () => {
    const imageUploadFetcher = useFetcher()
    const [pendingImages, setPendingImages] = useState<string[]>([])

    useEffect(() => {
        if (Boolean(imageUploadFetcher.data)) {
            console.log('make skeletons for pending images: ' + JSON.stringify(imageUploadFetcher.data))
            setPendingImages(imageUploadFetcher.data)
        }
    }, [imageUploadFetcher.data, setPendingImages])

    return {pendingImages : pendingImages, imageSubmit: imageUploadFetcher.submit}

}
