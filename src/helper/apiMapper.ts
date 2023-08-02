import {MarkerType, TransientMarker} from "../types/marker";
import {OsApiImageType, OSApiType, OsImageType, TransientOSApiType} from "../types/api";
import {LatLng} from "leaflet";
import {localDayjs} from "./dayjsTimezone";

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
        position: new LatLng(os.location.lat, os.location.lng),
        title: os.title,
        startDate: localDayjs(os.start_date),
        endDate: localDayjs(os.end_date)
    }
}
export const uploadResponseToImageType = (uploadedImage: OsApiImageType): OsImageType => {
    return {
        imageIdentifier: uploadedImage.identifier,
        osIdentifier: uploadedImage.os_identifier,
        isAvailable: true
    }
}
export const markerToOs = (os: MarkerType): OSApiType => {
    return {
        identifier: os.identifier,
        location: {lat: os.position.lat, lng: os.position.lng},
        title: os.title,
        start_date: os.startDate.toISOString(),
        end_date: os.endDate.toISOString()
    }
}