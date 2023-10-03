import axios from "axios";
import {Endpoints} from "../config/Endpoints";
import {LoaderFunctionArgs} from "react-router-dom";
import {
    ImageNotAvailable,
    ImpressionImageUpload,
    OsImageApiType,
    TransientImageType,
    uploadResponseToImageType
} from "../types/image";
import {ImageDetailsApiService} from "./imageDetailsApi";
import {makeAuthHeader} from "./auth0Api";

export const ImageApiServices = {
    upload: async (image: ImpressionImageUpload, token: string) => {
        const uploadData = new FormData()
        uploadData.append('image', image.imageFile)
        return axios.post(Endpoints.openSpaceImages(image.osIdentifier), uploadData, makeAuthHeader(token)).then(response => {
            console.log(`uploaded file ${uploadData} to ${Endpoints.openSpaceImages(image.osIdentifier)}`)
            return uploadResponseToImageType(response.data)
        }).catch(error => {
            console.log(`error uploading files for: ${JSON.stringify(image.osIdentifier)}: ${error}`)
            return new ImageNotAvailable()
        })
    },

    loadAll: (args: LoaderFunctionArgs) =>
        axios.get(Endpoints.openSpaceImages(args.params.os_id!)).then(response => {
            console.log(`loaded images for os ${args.params.os_id}: ${JSON.stringify(response.data)}`)
            return (response.data as OsImageApiType[]).map(image => uploadResponseToImageType(image))
        }).then((images) => {
            return Promise.all(images.map(image => ImageDetailsApiService.loadDetails(image)
                .then((imageDetails) => {
                    const imageWithDetails = {
                        ...image,
                        description: imageDetails.description
                    };
                    console.log(`combining images with details: ${JSON.stringify(image)}, ${JSON.stringify(imageDetails)}: ` + JSON.stringify(imageWithDetails))
                    return imageWithDetails

                })))
        }).catch(error => {
            console.log(`error fetching images for os ${args.params.os_id}: ${error}`)
            return []
        }),

    delete: (image: TransientImageType,token: string) =>
        axios.delete(Endpoints.openSpaceImage(image),makeAuthHeader(token)).catch((error) => {
            console.log(`error deleting image: ${image}: ${error}`)
        })
    ,

    makeHeader: (image: TransientImageType) =>
        axios.patch(Endpoints.openSpaceImage(image), {is_header: true}).then((response) => {
            console.log(`made: ${JSON.stringify(image)} to header image`)
            return uploadResponseToImageType(response.data)
        }),

    getHeaderImage: (osId: string) =>
        axios.get(Endpoints.headerImage(osId)).then((response) => {
            if (response.data.length === 1) {
                console.log(`getting header image for ${osId}: ${JSON.stringify(response.data[0])}`)
                return uploadResponseToImageType(response.data[0])
            } else {
                return new ImageNotAvailable()
            }
        })
}
