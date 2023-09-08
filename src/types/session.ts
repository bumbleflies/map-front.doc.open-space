import {Dayjs} from "dayjs";
import {localDayjs} from "../helper/dayjsTimezone";
import {ImageType, OsImageApiType} from "./image";

export type OsSessionMeta = {
    osIdentifier: string,
    sessionIdentifier: string

}
export type OsSession = OsSessionMeta & {
    title: string,
    startDate: Dayjs,
    endDate: Dayjs
}

export type OsSessionDetailsApiType = {
    title: string,
    start_date: string,
    end_date: string
}

export type OsSessionMetaApiType = {
    identifier: string,
    os_identifier: string
}
export type OsSessionApiType = OsSessionDetailsApiType & OsSessionMetaApiType

export type SessionImageUpload = OsSessionMeta & {
    imageFile: File
}

export type OsSessionImageApiType = OsImageApiType & {
    session_identifier: string
}

export type OsSessionImage = ImageType & OsSessionMeta

export type OsSessionWithImages = OsSession & {
    images: OsSessionImage[]
}

export const mapSessionImagesApi = (session: OsSession, apiImages: [OsSessionImageApiType]): OsSessionWithImages => {
    return {
        ...session,
        images: apiImages.map(image => {
            return {
                imageIdentifier: image.identifier,
                osIdentifier: session.osIdentifier,
                sessionIdentifier: session.sessionIdentifier,
                isHeader:false,
                isAvailable:true
            }
        })
    }
}

export const mapOsSessionApi = (apiType: OsSessionApiType): OsSession => {
    return {
        osIdentifier: apiType.os_identifier,
        sessionIdentifier: apiType.identifier,
        startDate: localDayjs(apiType.start_date),
        endDate: localDayjs(apiType.end_date),
        title: apiType.title
    }
}
