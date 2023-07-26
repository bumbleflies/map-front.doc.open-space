import {MarkerType} from "../types/marker";
import axios from "axios";
import {Endpoints} from "../config/Endpoints";

export const deleteMarker = (marker: MarkerType) => {
    return axios.delete(new URL(marker.identifier, Endpoints.openSpaces).toString()).then(() => {
        console.log(`deleted marker: ${JSON.stringify(marker)}`)
    }).catch(error => console.error(`failed to delete marker: ${error}`))
}
