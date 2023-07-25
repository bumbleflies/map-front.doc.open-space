import {LatLngExpression} from "leaflet";
import {Dayjs} from "dayjs";

export type MarkerType = {
    identifier: string,
    position: LatLngExpression,
    title: string,
    startDate: Dayjs,
    endDate: Dayjs
}