import {OsApiImageType, OsImageNotAvailable, OsImageType, OsImageUpload} from "../types/api";
import axios from "axios";
import {Endpoints} from "../config/Endpoints";
import {uploadResponseToImageType} from "./apiMapper";
import {LoaderFunctionArgs} from "react-router-dom";

const uploadImage = (image: OsImageUpload) => {
    const uploadData = new FormData()
    uploadData.append('image', image.imageFile)
    return axios.post(Endpoints.openSpaceImages(image.osIdentifier), uploadData).then(response => {
        console.log(`uploaded file ${uploadData} to ${Endpoints.openSpaceImages(image.osIdentifier)}`)
        return uploadResponseToImageType(response.data)
    }).catch(error => {
        console.log(`error uploading files for: ${JSON.stringify(image.osIdentifier)}: ${error}`)
        return new OsImageNotAvailable()
    })
}

const loadImages = (args: LoaderFunctionArgs) => {
    return axios.get(Endpoints.openSpaceImages(args.params.os_id!)).then(response => {
        console.log(`loaded images for os ${args.params.os_id}: ${JSON.stringify(response.data)}`)
        return (response.data as OsApiImageType[]).map(image => uploadResponseToImageType(image))
    }).catch(error => {
        console.log(`error fetching images for os ${args.params.os_id}: ${error}`)
        return []
    })
}

const deleteImage = (image: OsImageType) => {
    return axios.delete(Endpoints.openSpaceImage(image.osIdentifier, image.imageIdentifier)).catch((error) => {
        console.log(`error deleting image: ${image}: ${error}`)
    })
}

export const apiServices = {
    upload: uploadImage,
    loadAll: loadImages,
    delete: deleteImage
}
