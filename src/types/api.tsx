export type TransientOSApiType = {
    title: string,
    start_date: string,
    end_date: string,
    location: { lat: number, lng: number }
}
export type OSApiType = {
    identifier: string,
} & TransientOSApiType