import {OsImageApiType} from "../types/api";
import axios from "axios";
import {Endpoints} from "../config/Endpoints";
import {uploadResponseToImageType} from "./apiMapper";
import {LoaderFunctionArgs} from "react-router-dom";
import {ImageNotAvailable, ImageUpload, TransientImageType} from "../types/image";
import {ImageDetailsApiService} from "./imageDetailsApi";

export const ImageApiServices = {
    upload: (image: ImageUpload) => {
        const uploadData = new FormData()
        uploadData.append('image', image.imageFile)
        return axios.post(Endpoints.openSpaceImages(image.osIdentifier), uploadData).then(response => {
            console.log(`uploaded file ${uploadData} to ${Endpoints.openSpaceImages(image.osIdentifier)}`)
            return uploadResponseToImageType(response.data)
        }).catch(error => {
            console.log(`error uploading files for: ${JSON.stringify(image.osIdentifier)}: ${error}`)
            return new ImageNotAvailable()
        })
    },
    loadAll: (args: LoaderFunctionArgs) => {
        return axios.get(Endpoints.openSpaceImages(args.params.os_id!)).then(response => {
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
        })
    },
    delete: (image: TransientImageType) => {
        return axios.delete(Endpoints.openSpaceImage(image)).catch((error) => {
            console.log(`error deleting image: ${image}: ${error}`)
        })
    },

    makeHeader: (image: TransientImageType) => {
        return axios.patch(Endpoints.openSpaceImage(image), {is_header: true}).then((response) => {
            console.log(`made: ${image} to header image`)
            return uploadResponseToImageType(response.data)
        })
    },
    getHeaderImage: (osId: string) => {
        return axios.get(Endpoints.headerImage(osId)).then((response) => {
            if (response.data.length === 1) {
                console.log(`getting header image for ${osId}: ${JSON.stringify(response.data[0])}`)
                return uploadResponseToImageType(response.data[0])
            } else {
                return new ImageNotAvailable()
            }
        })
    },
}
