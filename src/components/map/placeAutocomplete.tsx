import React, {useEffect, useState} from "react";
import {Autocomplete, TextField} from "@mui/material";
import usePlacesAutocomplete from "use-places-autocomplete";
import {useDataFromMatcher} from "../../helper/dataFromMatcher";
import {MarkerType} from "../../types/marker";
import {fromLatLng, setKey,} from "react-geocode";

export const PlaceAutocomplete = () => {
    const [infoEditMarker, setInfoEditMarker] = useState<MarkerType | null>(null)

    useDataFromMatcher<MarkerType | null>({id: 'os', stateSetter: setInfoEditMarker})

    const [placeOptions, setPlaceOptions] = useState<string[]>([])
    const {
        ready,
        value,
        suggestions: {status, data},
        setValue,
        init
    } = usePlacesAutocomplete({
        requestOptions: {
            locationBias: {
                center: infoEditMarker !== null ? infoEditMarker!.position : {lat: 1, lng: 1},
                radius: 10000
            },
            origin: infoEditMarker?.position,
        },
        debounce: 300,
        callbackName: 'none',
        initOnMount: false
    });

    useEffect(() => {
        if (infoEditMarker !== null) {
            setKey(process.env.REACT_APP_GOOGLE_API_KEY!)
            init()
            fromLatLng(infoEditMarker.position.lat, infoEditMarker.position.lng).then((locationHints) => {
                setValue(locationHints.results[0].formatted_address)
            })
        }
    }, [infoEditMarker, init]);

    useEffect(() => {
        if (ready && 'OK' === status) {
            setPlaceOptions(data.map(place => place.description))
        }
    }, [data, ready, status]);

    return (
        <>
            <Autocomplete
                filterOptions={(x) => x}
                autoComplete
                freeSolo
                renderInput={(params) =>
                    <TextField {...params} label={'Place'}/>}
                options={placeOptions}
                onInputChange={(e: React.SyntheticEvent, newValue: string) => {
                    setValue(newValue)
                }}
                value={value}
                noOptionsText={'Start typing to find place'}
            />

        </>
    )
}
