import {MarkerType} from "../types/marker";
import axios from "axios";
import {Endpoints} from "../config/Endpoints";
import {osLoaderToMarker} from "./loader";
import {osLoaderType} from "../types/openSpace";

export const markerToOs = (os: MarkerType): osLoaderType => {
    return {
        identifier: os.identifier,
        location: os.position,
        title: os.title,
        start_date: os.startDate.toISOString(),
        end_date: os.endDate.toISOString()
    }
}

export const saveMarker = (marker: MarkerType) => {
    return axios.post(Endpoints.openSpaces, markerToOs(marker)).then(response => {
        console.log(`saved marker: ${JSON.stringify(marker)}`)
        return osLoaderToMarker(response.data);
    }).catch(error => {
        console.log(`error saving marker: ${JSON.stringify(marker)}: ${error}`)
        return marker
    })
}
