export type TransientOSApiType = {
    title: string,
    start_date: string,
    end_date: string,
    location: { lat: number, lng: number }
}
export type OSApiType = {
    identifier: string,
} & TransientOSApiType

export interface HasAvailable {
    isAvailable: boolean
}

export type OsImageType = {
    osIdentifier: string,
    imageIdentifier: string
} & HasAvailable

export class OsImageNotAvailable implements HasAvailable {
    isAvailable: boolean = false
}


export type OsApiImageType = {
    identifier: string,
    os_identifier: string
}

export type OsImageUpload = {
    osIdentifier: string,
    imageFile: File
}