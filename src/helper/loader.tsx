import {Endpoints} from "../config/Endpoints";
import axios from "axios";
import {MarkerType} from "../types/marker";
import {LatLng} from "leaflet";
import {OSApiType} from "../types/api";
import {localDayjs} from "./dayjsTimezone";

export const osLoaderToMarker = (os: OSApiType): MarkerType => {
    return {
        identifier: os.identifier,
        position: new LatLng(os.location.lat, os.location.lng),
        title: os.title,
        startDate: localDayjs(os.start_date),
        endDate: localDayjs(os.end_date)
    }
}

export const osLoader = async () => {
    let openSpaces: OSApiType[] = []
    await axios.get(Endpoints.openSpaces).then(response => {
        openSpaces = response.data
    }).catch(error => {
        console.log(`Failed to load Open Spaces: ${error}`)
    })
    console.log(`loaded open spaces: ${JSON.stringify(openSpaces)}`)
    return openSpaces.map(osLoaderToMarker)
}
