import {LoaderFunctionArgs, redirect} from "react-router-dom";
import axios from "axios";
import {Endpoints} from "../config/Endpoints";
import {ImageDetailsType, TransientImageType} from "../types/image";

export const ImageDetailsApiService = {
    loadDetails: (image: TransientImageType) => {
        return axios.get(Endpoints.openSpaceImageDetails(image)).then(response => {
            console.log(`loaded image details for os ${JSON.stringify(image)}: ${JSON.stringify(response.data)}`)
            return response.data as ImageDetailsType
        }).catch((error) => {
            return {description: image.imageIdentifier}
        })
    },

    load: (args: LoaderFunctionArgs) => {
        const osId = args.params.os_id!;
        const imageId = args.params.image_id!;
        return ImageDetailsApiService.loadDetails({osIdentifier: osId, imageIdentifier: imageId})
    },

    editDetails(image: TransientImageType, details: ImageDetailsType) {
        return axios.put(Endpoints.openSpaceImageDetails(image), details).then(response => {
            return redirect('../..')
        })
    }
}
