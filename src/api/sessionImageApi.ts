import axios from "axios";
import {Endpoints} from "../config/Endpoints";
import {ImageNotAvailable, uploadResponseToImageType} from "../types/image";
import {OsSessionImage, SessionImageUpload} from "../types/session";
import {makeAuthHeader} from "./auth0Api";

export const SessionImageApiServices = {
    upload: async (image: SessionImageUpload, token: string) => {
        const uploadData = new FormData()
        uploadData.append('image', image.imageFile)
        return axios.post(Endpoints.openSpaceSessionImages(image), uploadData, makeAuthHeader(token)).then(response => {
            console.log(`uploaded file ${uploadData} to ${Endpoints.openSpaceSessionImages(image)}`)
            return uploadResponseToImageType(response.data)
        }).catch(error => {
            console.log(`error uploading files for: ${JSON.stringify(image.sessionIdentifier)}: ${error}`)
            return new ImageNotAvailable()
        })
    },

    delete: async (image: OsSessionImage, token: string) =>
        axios.delete(Endpoints.openSpaceSessionImage(image), makeAuthHeader(token)).then(() => console.log(`deleted image: ${image.imageIdentifier}`)),

    makeHeader: async (image: OsSessionImage) =>
        axios.patch(Endpoints.openSpaceSessionImage(image), {is_header: true}).then((response) => {
            console.log(`made: ${JSON.stringify(image)} to header image`)
            return uploadResponseToImageType(response.data)
        }),
}
