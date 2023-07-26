import {osLoaderType} from "../types/openSpace";
import {Endpoints} from "../config/Endpoints";
import axios from "axios";
import {MarkerType} from "../types/marker";
import dayjs from "dayjs";
import {LatLng} from "leaflet";

export const osLoaderToMarker = (os: osLoaderType): MarkerType => {
    return {
        identifier: os.identifier,
        position: new LatLng(os.location.lat, os.location.lng),
        title: os.title,
        startDate: dayjs(os.start_date),
        endDate: dayjs(os.end_date)
    }
}

export const osLoader = async () => {
    let openSpaces: osLoaderType[] = []
    await axios.get(Endpoints.openSpaces).then(response => {
        openSpaces = response.data
    }).catch(error => {
        console.log(`Failed to load Open Spaces: ${error}`)
    })
    console.log(`loaded open spaces: ${JSON.stringify(openSpaces)}`)
    return openSpaces.map(osLoaderToMarker)
}
