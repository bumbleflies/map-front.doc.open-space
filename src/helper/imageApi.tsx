import {OsImageNotAvailable, OsImageUpload} from "../types/api";
import axios from "axios";
import {Endpoints} from "../config/Endpoints";
import {uploadResponseToImageType} from "./apiMapper";

export const uploadImage = (image: OsImageUpload) => {
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