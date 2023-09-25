import React, {Dispatch, SetStateAction, SyntheticEvent, useEffect, useState} from "react";
import {Autocomplete, TextField} from "@mui/material";
import usePlacesAutocomplete from "use-places-autocomplete";
import {MarkerPosition, MarkerPositionType} from "../../types/marker";
import {fromLatLng, setKey,} from "react-geocode";

type PlaceAutocompleteProps = {
    position: MarkerPositionType | null,
    onUpdatePosition: Dispatch<SetStateAction<MarkerPositionType | null>>
}
export const PlaceAutocomplete = ({position, onUpdatePosition}: PlaceAutocompleteProps) => {
    const [placeOptions, setPlaceOptions] = useState<string[]>([])

    const {
        ready,
        value,
        suggestions: {status, data},
        setValue,
        init
    } = usePlacesAutocomplete({
        requestOptions: position ? {
            locationBias: {
                center: position,
                radius: 1000
            },
            origin: position,
        } : {},
        debounce: 300,
        callbackName: 'none',
        initOnMount: false
    });

    useEffect(() => {
        setKey(process.env.REACT_APP_GOOGLE_API_KEY!)
        init()
        if (false &&position ) {
            fromLatLng(position!.lat, position!.lng).then((locationHints) => {
                console.log(locationHints)
                setValue(locationHints.results[0].formatted_address)
            }).catch((error) => {
            })
        }
    }, [setValue, position, init]);

    useEffect(() => {
        if (ready && 'OK' === status) {
            setPlaceOptions([...new Set([value, ...data.map(place => place.description)])])
        }
    }, [data, ready, status]);

    const onNewPlace = (e: SyntheticEvent, reason: string) => {
        console.log(reason)
        if (reason === 'selectOption'&&position) {
            onUpdatePosition(new MarkerPosition({...position, place: value}))
        }
    }

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
                onClose={onNewPlace}
                value={value}
                noOptionsText={'Start typing to find place'}
            />
        </>
    )
}
