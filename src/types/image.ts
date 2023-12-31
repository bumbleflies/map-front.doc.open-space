export interface HasAvailable {
    isAvailable: boolean
}

export type TransientImageType = {
    osIdentifier: string,
    imageIdentifier: string
}

export type HasHeader = {
    isHeader: boolean
}

export type ImageType = TransientImageType & HasAvailable & HasHeader

export class ImageNotAvailable implements ImageType {
    isAvailable: boolean = false
    imageIdentifier = '';
    isHeader = false;
    osIdentifier = '';

}

export type ImpressionImageUpload = {
    osIdentifier: string,
    imageFile: File
}

export type ImageDetailsType = {
    description: string,
}

export type ImageVariant = "full" | "thumb" | "header"

export type ImageWithDetailsType = ImageType & ImageDetailsType

export type OsImageApiType = {
    identifier: string,
    os_identifier: string,
    is_header: boolean
}
export const uploadResponseToImageType = (uploadedImage: OsImageApiType): ImageType => {
    return {
        imageIdentifier: uploadedImage.identifier,
        osIdentifier: uploadedImage.os_identifier,
        isAvailable: true,
        isHeader: uploadedImage.is_header
    }
}