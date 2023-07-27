import axios from "axios";
import {Endpoints} from "../config/Endpoints";
import {OsApiImageType, OsImageNotAvailable, OsImageType, OsImageUpload} from "../types/api";

const uploadResponseToImageType = (uploadedImage: OsApiImageType): OsImageType => {
    return {
        imageIdentifier: uploadedImage.identifier,
        osIdentifier: uploadedImage.os_identifier,
        isAvailable: true
    }
}

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
