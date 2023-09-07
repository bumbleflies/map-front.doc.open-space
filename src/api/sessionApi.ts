import axios from "axios";
import {LoaderFunctionArgs} from "react-router-dom";
import {Endpoints} from "../config/Endpoints";
import {
    mapOsSessionApi,
    mapSessionImagesApi,
    OsSession,
    OsSessionApiType,
    OsSessionDetailsApiType,
    OsSessionMeta
} from "../types/session";
import {MarkerType} from "../types/marker";
import {OsApiServices} from "./osApi";

export type OsWithSessions = {
    os: MarkerType,
    sessions: OsSession[]
}
export const SessionApiServices = {
    edit: async (sessionMeta: OsSessionMeta, newSession: OsSessionDetailsApiType) =>
        axios.put(Endpoints.openSpaceSession(sessionMeta), newSession).then((response) => {
            return mapOsSessionApi(response.data)
        })
    ,
    loadWithImages: async (args: LoaderFunctionArgs) => SessionApiServices.load(args)
        .then((session: OsSession) => axios.get(Endpoints.openSpaceSessionImages({
            sessionIdentifier: args.params.session_id!,
            osIdentifier: args.params.os_id!
        })).then(response=>{
            console.log(`loaded images for session ${args.params.session_id}: ${JSON.stringify(response.data)}`)
            return mapSessionImagesApi(session, response.data)
        })),

    load: async (args: LoaderFunctionArgs): Promise<OsSession> =>
        axios.get(Endpoints.openSpaceSession({
            sessionIdentifier: args.params.session_id!,
            osIdentifier: args.params.os_id!
        })).then((response) => {
            console.log(`loaded session for os ${args.params.os_id}: ${JSON.stringify(response.data)}`)
            return mapOsSessionApi(response.data)
        })
    ,

    loadAll: async (args: LoaderFunctionArgs): Promise<OsWithSessions> =>
        OsApiServices.load(args).then(os =>
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
    ,

    add: async (osId: string, session: OsSessionDetailsApiType): Promise<OsSession> =>
        axios.post(Endpoints.openSpaceSessions(osId), session).then((response) => {
            console.log(`Added new session ${JSON.stringify(session)} to ${osId}...`)
            return mapOsSessionApi(response.data)
        }),

    delete: async (sessionMeta: OsSessionMeta): Promise<void> => {
        console.log(`Deleting new session ${JSON.stringify(sessionMeta)}...`)
        return axios.delete(Endpoints.openSpaceSession(sessionMeta))
    }
}
