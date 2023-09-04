import {MarkerType, MarkerWithImage} from "../types/marker";
import axios from "axios";
import {Endpoints} from "../config/Endpoints";
import {markerToOs, osLoaderToMarker} from "../helper/apiMapper";
import {LoaderFunctionArgs, redirect} from "react-router-dom";
import {OSApiType, TransientOSApiType} from "../types/api";
import {ImageApiServices} from "./imageApi";

export const OsApiServices = {
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
    load: (args: LoaderFunctionArgs): Promise<null | MarkerWithImage | Response> => {
        return axios.get(Endpoints.openSpace(args.params.os_id!)).then(response => {
            console.log(`loaded open space: ${JSON.stringify(response.data)}`)
            return osLoaderToMarker(response.data)
        }).then(marker => {
            return ImageApiServices.getHeaderImage(args.params.os_id!).then(headerImage => {
                return {
                    ...marker,
                    ...headerImage
                }
            })
        }).catch(error => {
            console.log(`Failed to load Open Space ${args.params.os_id}: ${error}`)
            return redirect('/')
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
        return OsApiServices.putApiMarker(markerToOs(marker))
    },
    delete: (identifier: string) => {
        console.log(`deleting open space: ${identifier}`)
        return axios.delete(new URL(identifier, Endpoints.openSpaces).toString())
            .catch(error => console.error(`failed to delete marker: ${error}`))
    }
}
