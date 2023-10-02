import {
    markerToOs,
    MarkerType,
    MarkerWithImage,
    OSApiType,
    osLoaderToMarker,
    TransientOSApiType
} from "../types/marker";
import axios from "axios";
import {Endpoints} from "../config/Endpoints";
import {LoaderFunctionArgs, redirect} from "react-router-dom";
import {ImageNotAvailable, ImageType, uploadResponseToImageType} from "../types/image";

const makeAuthHeader = (token: string) => {
    return {headers: {Authorization: `Bearer ${token}`}}
}
export const OsApiServices = {
    save: (marker: TransientOSApiType, token: string): Promise<MarkerType | null> =>
        axios.post(Endpoints.openSpaces, marker, makeAuthHeader(token)).then(response => {
            console.log(`saved marker: ${JSON.stringify(marker)}`)
            return osLoaderToMarker(response.data);
        }).catch(error => {
            console.log(`error saving marker: ${JSON.stringify(marker)}: ${error}`)
            return null
        }),

    loadAll: (): Promise<MarkerType[]> =>
        axios.get(Endpoints.openSpaces).then(response => {
            console.log(`loaded open spaces: ${JSON.stringify(response.data)}`)
            return response.data.map(osLoaderToMarker)
        }).catch(error => {
            console.log(`Failed to load Open Spaces: ${error}`)
            return []
        }),

    load: (args: LoaderFunctionArgs): Promise<null | MarkerWithImage | Response> =>
        axios.get(Endpoints.openSpace(args.params.os_id!) + "?with_header_images=true").then(response => {
            console.log(`loaded open space: ${JSON.stringify(response.data)}`)
            const os = osLoaderToMarker(response.data)
            const headerImages: ImageType[] = Boolean(response.data.header_images) ?
                response.data.header_images.map(uploadResponseToImageType)
                :
                [new ImageNotAvailable()]
            return {
                ...os,
                ...headerImages[0]
            }
        }).catch(error => {
            console.log(`Failed to load Open Space ${args.params.os_id}: ${error}`)
            return redirect('/')
        }),

    putApiMarker: (apiMarker: OSApiType): Promise<MarkerType> =>
        axios.put(Endpoints.openSpace(apiMarker.identifier), apiMarker).then(response => {
            console.log(`updated open space: ${JSON.stringify(response.data)}`)
            return osLoaderToMarker(response.data);
        }).catch(() => {
            return osLoaderToMarker(apiMarker)
        }),

    put: (marker: MarkerType): Promise<MarkerType> => OsApiServices.putApiMarker(markerToOs(marker)),

    delete: (identifier: string, token: string): Promise<void> =>
        axios.delete(new URL(identifier, Endpoints.openSpaces).toString(), makeAuthHeader(token))
            .then(() => console.log(`deleted open space: ${identifier}`))
            .catch(error => console.error(`failed to delete marker: ${error}`))

}
