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

export type ImageUpload = {
    osIdentifier: string,
    imageFile: File
}

export type ImageDetailsType = {
    description: string,
}

export type ImageWithDetailsType = ImageType & ImageDetailsType