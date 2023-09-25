import {LatLng, LatLngLiteral} from "leaflet";
import {Dayjs} from "dayjs";
import {ImageNotAvailable, ImageType} from "./image";
import {localDayjs} from "../helper/dayjsTimezone";

export type PlaceType = string

export type MarkerPositionType = LatLngLiteral & {
    place?: PlaceType
}

export class MarkerPosition extends LatLng implements MarkerPositionType {
    place: PlaceType;

    constructor({lat, lng, place}: MarkerPositionType) {
        super(lat, lng);
        this.place = place ? place : `${lat}, ${lng}`
    }
}

export type TransientMarker = {
    position: MarkerPosition,
    title: string,
    startDate: Dayjs,
    endDate: Dayjs
}

export type MarkerType = TransientMarker &
    {
        identifier: string,
    }

export type OptionalMarkerProps = {
    position?: MarkerPositionType,
    title?: string,
    startDate?: Dayjs,
    endDate?: Dayjs
    identifier?: string,
}

export type MarkerWithImage = MarkerType & (ImageType | ImageNotAvailable)

export type TransientOSApiType = {
    title: string,
    start_date: string,
    end_date: string,
    location: { lat: number, lng: number, place: string }
}

export type OSApiType = {
    identifier: string,
} & TransientOSApiType

export function update(marker: MarkerType) {
    return {
        with: (newMarkerProps: OptionalMarkerProps): MarkerType => {
            return {
                ...marker,
                ...newMarkerProps.title && {title: newMarkerProps.title},
                ...newMarkerProps.identifier && {identifier: newMarkerProps.identifier},
                ...newMarkerProps.startDate && {startDate: newMarkerProps.startDate},
                ...newMarkerProps.endDate && {endDate: newMarkerProps.endDate},
                ...newMarkerProps.position && {position: new MarkerPosition(newMarkerProps.position)}
            }
        }
    }
}

export const markerToOs = (os: MarkerType): OSApiType => {
    return {
        identifier: os.identifier,
        location: {lat: os.position.lat, lng: os.position.lng, place:os.position.place},
        title: os.title,
        start_date: os.startDate.toISOString(),
        end_date: os.endDate.toISOString()
    }
}
export const transientMarkerToOs = (os: TransientMarker): TransientOSApiType => {
    return {
        location: os.position,
        title: os.title,
        start_date: os.startDate.toISOString(),
        end_date: os.endDate.toISOString()
    }
}
export const osLoaderToMarker = (os: OSApiType): MarkerType => {
    return {
        identifier: os.identifier,
        position: new MarkerPosition({...os.location, place: ''}),
        title: os.title,
        startDate: localDayjs(os.start_date),
        endDate: localDayjs(os.end_date)
    }
}