export interface HasAvailable {
    isAvailable: boolean
}

export type TransientImageType = {
    osIdentifier: string,
    imageIdentifier: string
}
export type ImageType = TransientImageType & HasAvailable

export class ImageNotAvailable implements HasAvailable {
    isAvailable: boolean = false
}

export type ImpressionImageUpload = {
    osIdentifier: string,
    imageFile: File
}

export type ImageDetailsType = {
    description: string,
}

export type ImageWithDetailsType = ImageType & ImageDetailsType

export type OsImageApiType = {
    identifier: string,
    os_identifier: string
}
export const uploadResponseToImageType = (uploadedImage: OsImageApiType): ImageType => {
    return {
        imageIdentifier: uploadedImage.identifier,
        osIdentifier: uploadedImage.os_identifier,
        isAvailable: true
    }
}