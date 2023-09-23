import React, {useEffect, useState} from "react";
import {Autocomplete, TextField} from "@mui/material";
import usePlacesAutocomplete from "use-places-autocomplete";
import {useDataFromMatcher} from "../../helper/dataFromMatcher";
import {MarkerType} from "../../types/marker";

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
            init()
        }
    }, [infoEditMarker]);

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
                isOptionEqualToValue={(option, value) => option.toLowerCase().startsWith(value.toLowerCase())}
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
