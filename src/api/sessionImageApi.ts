import axios from "axios";
import {Endpoints} from "../config/Endpoints";
import {ImageNotAvailable, uploadResponseToImageType} from "../types/image";
import {OsSessionImage, SessionImageUpload} from "../types/session";

export const SessionImageApiServices = {
    upload: async (image: SessionImageUpload) => {
        const uploadData = new FormData()
        uploadData.append('image', image.imageFile)
        return axios.post(Endpoints.openSpaceSessionImages(image), uploadData).then(response => {
            console.log(`uploaded file ${uploadData} to ${Endpoints.openSpaceSessionImages(image)}`)
            return uploadResponseToImageType(response.data)
        }).catch(error => {
            console.log(`error uploading files for: ${JSON.stringify(image.sessionIdentifier)}: ${error}`)
            return new ImageNotAvailable()
        })
    },

    delete: async (image: OsSessionImage) =>
        axios.delete(Endpoints.openSpaceSessionImage(image)).then(() => console.log(`deleted image: ${image.imageIdentifier}`))
}
