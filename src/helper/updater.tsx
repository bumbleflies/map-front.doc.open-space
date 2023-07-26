import {MarkerType} from "../types/marker";
import axios from "axios";
import {Endpoints} from "../config/Endpoints";
import {osLoaderToMarker} from "./loader";
import {OSApiType} from "../types/api";

export const markerToOs = (os: MarkerType): OSApiType => {
    return {
        identifier: os.identifier,
        location: os.position,
        title: os.title,
        start_date: os.startDate.toISOString(),
        end_date: os.endDate.toISOString()
    }
}

export const putMarker = (marker: MarkerType) => {
    return axios.put(new URL(marker.identifier, Endpoints.openSpaces).toString(), markerToOs(marker)).then(response => {
        return osLoaderToMarker(response.data);
    }).catch(error => {
        return marker
    })
}
