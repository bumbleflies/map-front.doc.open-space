export interface HasAvailable {
    isAvailable: boolean
}

export type OsTransientImageType = {
    osIdentifier: string,
    imageIdentifier: string
}
export type OsImageType = OsTransientImageType & HasAvailable

export class OsImageNotAvailable implements HasAvailable {
    isAvailable: boolean = false
}

export type OsImageUpload = {
    osIdentifier: string,
    imageFile: File
}