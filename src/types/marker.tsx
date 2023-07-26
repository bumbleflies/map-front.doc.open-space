import {LatLng} from "leaflet";
import {Dayjs} from "dayjs";

export type TransientMarker = {
    position: LatLng,
    title: string,
    startDate: Dayjs,
    endDate: Dayjs
}

export type MarkerType = TransientMarker &
    {
        identifier: string,
    }