import axios from "axios";
import {LoaderFunctionArgs} from "react-router-dom";
import {Endpoints} from "../config/Endpoints";
import {
    mapOsSessionApi,
    mapSessionImageApi,
    mapSessionImagesApi,
    OsSession,
    OsSessionApiType,
    OsSessionDetailsApiType,
    OsSessionImageApiType,
    OsSessionImageNotAvailable,
    OsSessionMeta,
    OsSessionWithHeaderImage,
    OsWithSessions
} from "../types/session";
import {makeAuthHeader} from "./auth0Api";

export type DeferredSessionType = {
    osWithSession: Promise<OsWithSessions>
}
export const SessionApiServices = {
    edit: async (sessionMeta: OsSessionMeta, newSession: OsSessionDetailsApiType, token: string) =>
        axios.put(Endpoints.openSpaceSession(sessionMeta), newSession, makeAuthHeader(token)).then((response) => {
            return mapOsSessionApi(response.data)
        })
    ,
    loadWithImages: async (args: LoaderFunctionArgs) => SessionApiServices.load(args)
        .then((session: OsSession) => axios.get(Endpoints.openSpaceSessionImages({
            sessionIdentifier: args.params.session_id!,
            osIdentifier: args.params.os_id!
        })).then(response => {
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

    loadAll: async ({params}: LoaderFunctionArgs): Promise<OsSessionWithHeaderImage[]> =>
        axios.get(Endpoints.openSpaceSessions(params.os_id!) + "?with_header_images=true").then((response) => {
            console.log(`loaded sessions for os ${params.os_id}: ${JSON.stringify(response.data)}`)
            const osSessions = (response.data as OsSessionApiType[]).map(session => mapOsSessionApi(session));
            const sessionHeader: OsSessionWithHeaderImage[] = osSessions.map((osSession, index) => {
                console.log('session header: ' + Boolean(response.data[index].header_images.length))
                const sessionHeaderImages = Boolean(response.data[index].header_images.length) ?
                    response.data[index].header_images.map((image: OsSessionImageApiType) => mapSessionImageApi(osSession, image))
                    :
                    [new OsSessionImageNotAvailable(osSession)]

                console.log('session header: ' + JSON.stringify(sessionHeaderImages))
                return {
                    ...osSession,
                    header: sessionHeaderImages.pop()
                }
            })
            return sessionHeader
        }),

    add: async (osId: string, session: OsSessionDetailsApiType, token: string): Promise<OsSession> =>
        axios.post(Endpoints.openSpaceSessions(osId), session, makeAuthHeader(token)).then((response) => {
            console.log(`Added new session ${JSON.stringify(session)} to ${osId}...`)
            return mapOsSessionApi(response.data)
        }),

    delete: async (sessionMeta: OsSessionMeta, token: string): Promise<void> => {
        console.log(`Deleting new session ${JSON.stringify(sessionMeta)}...`)
        return axios.delete(Endpoints.openSpaceSession(sessionMeta), makeAuthHeader(token))
    }
}
