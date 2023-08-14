import {LatLng} from "leaflet";
import {Dayjs} from "dayjs";
import {ImageNotAvailable, ImageType} from "./image";

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

export type OptionalMarkerProps = {
    position?: LatLng,
    title?: string,
    startDate?: Dayjs,
    endDate?: Dayjs
    identifier?: string,
}

export type MarkerWithImage = MarkerType & (ImageType | ImageNotAvailable)


export function update(marker: MarkerType) {
    return {
        with: (newMarkerProps: OptionalMarkerProps): MarkerType => {
            return {
                ...marker,
                ...newMarkerProps.title && {title: newMarkerProps.title},
                ...newMarkerProps.identifier && {identifier: newMarkerProps.identifier},
                ...newMarkerProps.startDate && {startDate: newMarkerProps.startDate},
                ...newMarkerProps.endDate && {endDate: newMarkerProps.endDate},
                ...newMarkerProps.position && {position: newMarkerProps.position}
            }
        }
    }
}