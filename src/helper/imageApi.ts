import {OsApiImageType} from "../types/api";
import axios from "axios";
import {Endpoints} from "../config/Endpoints";
import {uploadResponseToImageType} from "./apiMapper";
import {LoaderFunctionArgs} from "react-router-dom";
import {OsImageNotAvailable, OsImageUpload, OsTransientImageType} from "../types/image";

export const apiImageServices = {
    upload: (image: OsImageUpload) => {
        const uploadData = new FormData()
        uploadData.append('image', image.imageFile)
        return axios.post(Endpoints.openSpaceImages(image.osIdentifier), uploadData).then(response => {
            console.log(`uploaded file ${uploadData} to ${Endpoints.openSpaceImages(image.osIdentifier)}`)
            return uploadResponseToImageType(response.data)
        }).catch(error => {
            console.log(`error uploading files for: ${JSON.stringify(image.osIdentifier)}: ${error}`)
            return new OsImageNotAvailable()
        })
    },
    loadAll: (args: LoaderFunctionArgs) => {
        return axios.get(Endpoints.openSpaceImages(args.params.os_id!)).then(response => {
            console.log(`loaded images for os ${args.params.os_id}: ${JSON.stringify(response.data)}`)
            return (response.data as OsApiImageType[]).map(image => uploadResponseToImageType(image))
        }).catch(error => {
            console.log(`error fetching images for os ${args.params.os_id}: ${error}`)
            return []
        })
    },
    delete: (image: OsTransientImageType) => {
        return axios.delete(Endpoints.openSpaceImage(image.osIdentifier, image.imageIdentifier)).catch((error) => {
            console.log(`error deleting image: ${image}: ${error}`)
        })
    },

    makeHeader: (image: OsTransientImageType) => {
        return axios.patch(Endpoints.openSpaceImage(image.osIdentifier, image.imageIdentifier), {is_header: true}).then((response) => {
            console.log(`made: ${image} to header image`)
            return uploadResponseToImageType(response.data)
        })
    },
    getHeaderImage: (osId: string) => {
        return axios.get(Endpoints.headerImage(osId)).then((response) => {
            console.log(`getting header image for ${osId}: ${JSON.stringify(response)}`)
            if (response.data.length === 1) {
                return uploadResponseToImageType(response.data[0])
            } else {
                return new OsImageNotAvailable()
            }
        })
    }
}
