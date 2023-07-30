import {MarkerType, TransientMarker} from "../types/marker";
import axios from "axios";
import {Endpoints} from "../config/Endpoints";
import {v4 as uuidv4} from "uuid";
import {markerToOs, osLoaderToMarker, transientMarkerToOs} from "./apiMapper";

const saveMarker = (marker: TransientMarker) => {
    return axios.post(Endpoints.openSpaces, transientMarkerToOs(marker)).then(response => {
        console.log(marker)
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

const loadMarker = () => {
    return axios.get(Endpoints.openSpaces).then(response => {
        console.log(`loaded open spaces: ${JSON.stringify(response.data)}`)
        return response.data.map(osLoaderToMarker)
    }).catch(error => {
        console.log(`Failed to load Open Spaces: ${error}`)
        return []
    })
}
const putMarker = (marker: MarkerType) => {
    return axios.put(new URL(marker.identifier, Endpoints.openSpaces).toString(), markerToOs(marker)).then(response => {
        return osLoaderToMarker(response.data);
    }).catch(() => {
        return marker
    })
}

const deleteMarker = (marker: MarkerType) => {
    return axios.delete(new URL(marker.identifier, Endpoints.openSpaces).toString())
        .catch(error => console.error(`failed to delete marker: ${error}`))
}

export const apiServices = {
    save: saveMarker,
    load: loadMarker,
    put: putMarker,
    delete: deleteMarker
}
