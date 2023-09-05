import {Dayjs} from "dayjs";
import {localDayjs} from "../helper/dayjsTimezone";
export type OsSessionMeta = {
    osIdentifier: string,
    sessionIdentifier: string

}
export type OsSession =OsSessionMeta& {
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
    imageFile:File
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
