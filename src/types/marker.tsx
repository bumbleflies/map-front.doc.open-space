import {LatLng} from "leaflet";
import {Dayjs} from "dayjs";

export type MarkerType = {
    identifier: string,
    position: LatLng,
    title: string,
    startDate: Dayjs,
    endDate: Dayjs
}