import axios from "axios";
import {LoaderFunctionArgs} from "react-router-dom";
import {Endpoints} from "../config/Endpoints";
import {mapOsSessionApi, OsSession, OsSessionApiType, TransientOsSessionApiType} from "../types/session";
import {MarkerType} from "../types/marker";
import {OsApiServices} from "./osApi";

export type OsWithSessions = {
    os: MarkerType,
    sessions: OsSession[]
}
export const SessionApiServices = {
    loadAll: async (args: LoaderFunctionArgs): Promise<OsWithSessions> => {
        return OsApiServices.load(args).then(os =>
            axios.get(Endpoints.openSpaceSessions((os as MarkerType).identifier)).then((response) => {
                console.log(`loaded sessions for os ${args.params.os_id}: ${JSON.stringify(response.data)}`)
                return {
                    os: os as MarkerType,
                    sessions: (response.data as OsSessionApiType[]).map(session => mapOsSessionApi(session))
                }
            }).catch(error => {
                console.log(`Failed to load Sessions: ${error}`)
                return {
                    os: os as MarkerType,
                    sessions: []
                }
            })
        )
    },

    add: async (osId: string, session: TransientOsSessionApiType): Promise<OsSession> =>
        axios.post(Endpoints.openSpaceSessions(osId), session).then((response) => {
            console.log(`Added new session ${JSON.stringify(session)} to ${osId}...`)
            return mapOsSessionApi(response.data)
        })
}
