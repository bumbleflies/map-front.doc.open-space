import {MarkerType, MarkerWithImage} from "../types/marker";
import axios from "axios";
import {Endpoints} from "../config/Endpoints";
import {markerToOs, osLoaderToMarker} from "./apiMapper";
import {LoaderFunctionArgs} from "react-router-dom";
import {OSApiType, TransientOSApiType} from "../types/api";
import {apiImageServices} from "./imageApi";

export const apiOsServices = {
    save: (marker: TransientOSApiType) => {
        return axios.post(Endpoints.openSpaces, marker).then(response => {
            console.log(`saved marker: ${JSON.stringify(marker)}`)
            return osLoaderToMarker(response.data);
        }).catch(error => {
            console.log(`error saving marker: ${JSON.stringify(marker)}: ${error}`)
            return null
        })
    },
    loadAll: () => {
        return axios.get(Endpoints.openSpaces).then(response => {
            console.log(`loaded open spaces: ${JSON.stringify(response.data)}`)
            return response.data.map(osLoaderToMarker)
        }).catch(error => {
            console.log(`Failed to load Open Spaces: ${error}`)
            return []
        })
    },
    load: (args: LoaderFunctionArgs): Promise<null | MarkerWithImage> => {
        return axios.get(Endpoints.openSpace(args.params.os_id!)).then(response => {
            console.log(`loaded open space: ${JSON.stringify(response.data)}`)
            return osLoaderToMarker(response.data)
        }).then(marker => {
            return apiImageServices.getHeaderImage(args.params.os_id!).then(headerImage => {
                return {
                    ...marker,
                    ...headerImage
                }
            })
        }).catch(error => {
            console.log(`Failed to load Open Space ${args.params.os_id}: ${error}`)
            return null
        })
    },
    putApiMarker: (apiMarker: OSApiType) => {
        return axios.put(Endpoints.openSpace(apiMarker.identifier), apiMarker).then(response => {
            console.log(`updated open space: ${JSON.stringify(response.data)}`)
            return osLoaderToMarker(response.data);
        }).catch(() => {
            return osLoaderToMarker(apiMarker)
        })
    },
    put: (marker: MarkerType) => {
        return apiOsServices.putApiMarker(markerToOs(marker))
    },
    delete: (identifier: string) => {
        console.log(`deleting open space: ${identifier}`)
        return axios.delete(new URL(identifier, Endpoints.openSpaces).toString())
            .catch(error => console.error(`failed to delete marker: ${error}`))
    }
}
