import {MarkerType, TransientMarker} from "../types/marker";
import axios from "axios";
import {Endpoints} from "../config/Endpoints";
import {osLoaderToMarker} from "./loader";
import {TransientOSApiType} from "../types/api";
import {v4 as uuidv4} from "uuid";

export const transientMarkerToOs = (os: TransientMarker): TransientOSApiType => {
    return {
        location: os.position,
        title: os.title,
        start_date: os.startDate.toISOString(),
        end_date: os.endDate.toISOString()
    }
}

export const saveMarker = (marker: TransientMarker) => {
    return axios.post(Endpoints.openSpaces, transientMarkerToOs(marker)).then(response => {
        console.log(`saved marker: ${JSON.stringify(marker)}`)
        return osLoaderToMarker(response.data);
    }).catch(error => {
        console.log(`error saving marker: ${JSON.stringify(marker)}: ${error}`)
        let inMemoryMarker: MarkerType = {
            identifier: uuidv4(),
            position: marker.position,
            title: marker.title,
            startDate: marker.startDate,
            endDate: marker.endDate
        }
        return inMemoryMarker
    })
}
