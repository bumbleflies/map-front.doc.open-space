import {Dayjs} from "dayjs";
import {localDayjs} from "../helper/dayjsTimezone";

export type OsSession = {
    title: string,
    startDate: Dayjs,
    endDate: Dayjs
    osIdentifier: string,
    sessionIdentifier: string
}

export type TransientOsSessionApiType =  {
    title: string,
    start_date: string,
    end_date: string
}
export type OsSessionApiType = TransientOsSessionApiType  & {
    identifier: string,
    os_identifier: string
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
