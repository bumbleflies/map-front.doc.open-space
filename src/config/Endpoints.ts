// https://a-carreras-c.medium.com/development-and-production-variables-for-react-apps-c04af8b430a5
import {TransientImageType} from "../types/image";
import {OsSessionImage, OsSessionMeta} from "../types/session";
import {useParams} from "react-router-dom";

type ConfigType = {
    [hostname: string]: {
        url: URL
    }
}

const config: ConfigType = {
    'localhost': {url: new URL('http://localhost:5000/')},
    'open-space-app.servyy.duckdns.org': {url: new URL('https://api.open-space-app.servyy.duckdns.org/')}
}

const determineEnvironment = () => {
    let location = window.location.hostname
    let locationConfig = config[location]
    console.log(`selecting ${JSON.stringify(locationConfig)} based on ${location}`)
    return locationConfig
}

const ApiServer = determineEnvironment()

const SessionEndpoints = {
    openSpaceSessions: (id: string) => new URL('s/', Endpoints.openSpace(id) + '/').href,
    openSpaceSession: (sessionMeta: OsSessionMeta) => new URL(
        sessionMeta.sessionIdentifier,
        SessionEndpoints.openSpaceSessions(sessionMeta.osIdentifier)).href,
    openSpaceSessionImages: (sessionMeta: OsSessionMeta) => new URL(
        'i/',
        SessionEndpoints.openSpaceSession(sessionMeta) + '/').href,
    openSpaceSessionImage: (image: OsSessionImage) => new URL(
        image.imageIdentifier,
        SessionEndpoints.openSpaceSessionImages(image)).href
}

const ImagesEndpoints = {
    openSpaceImages: (id: string) => new URL('i/', Endpoints.openSpace(id) + '/').href,
    headerImage: (osId: string) => new URL(
        '?only_header=True',
        ImagesEndpoints.openSpaceImages(osId)).href,
    openSpaceImage: (image: TransientImageType) => new URL(
        image.imageIdentifier,
        ImagesEndpoints.openSpaceImages(image.osIdentifier)).href,
    openSpaceImageDetails: (image: TransientImageType) => new URL(
        'details',
        ImagesEndpoints.openSpaceImage(image) + '/').href,

}
export const Endpoints = {
    openSpaces: new URL('os/', ApiServer.url.href).href,
    openSpace: (id: string) => new URL(id, Endpoints.openSpaces).href,
    ...ImagesEndpoints,
    ...SessionEndpoints
}

export const useImpressionImageResolver = () => {
    const {os_id} = useParams<"os_id">();
    const {image_id} = useParams<"image_id">();

    return Endpoints.openSpaceImage({osIdentifier: os_id!, imageIdentifier: image_id!})
}

export const useSessionImageResolver = () => {
    const {os_id} = useParams<"os_id">();
    const {image_id} = useParams<"image_id">();
    const {session_id} = useParams<"session_id">();

    return Endpoints.openSpaceSessionImage({
        sessionIdentifier: session_id!,
        osIdentifier: os_id!,
        imageIdentifier: image_id!
    })
}
