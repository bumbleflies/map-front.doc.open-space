// https://a-carreras-c.medium.com/development-and-production-variables-for-react-apps-c04af8b430a5
import {TransientImageType} from "../types/image";
import {OsSessionMetaType} from "../types/session";

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

export const Endpoints = {
    openSpaces: new URL('os/', ApiServer.url.href).href,
    openSpace: (id: string) => new URL(id, Endpoints.openSpaces).href,
    openSpaceImages: (id: string) => new URL('i/', Endpoints.openSpace(id) + '/').href,
    headerImage: (osId: string) => new URL('?only_header=True', Endpoints.openSpaceImages(osId)).href,
    openSpaceImage: (image: TransientImageType) => new URL(image.imageIdentifier, Endpoints.openSpaceImages(image.osIdentifier)).href,
    openSpaceImageDetails: (image: TransientImageType) => new URL('details', Endpoints.openSpaceImage(image) + '/').href,
    openSpaceSessions: (id: string) => new URL('s/', Endpoints.openSpace(id) + '/').href,
    openSpaceSession: (sessionMeta: OsSessionMetaType) => new URL(sessionMeta.identifier, Endpoints.openSpaceSessions(sessionMeta.os_identifier)).href,
}
