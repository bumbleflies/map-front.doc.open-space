import React, {Dispatch, SetStateAction, SyntheticEvent, useEffect, useState} from "react";
import {Autocomplete, TextField} from "@mui/material";
import usePlacesAutocomplete from "use-places-autocomplete";
import {MarkerPosition, MarkerPositionType} from "../../types/marker";
import {setKey,} from "react-geocode";

type PlaceAutocompleteProps = {
    position: MarkerPositionType | null,
    onUpdatePosition: Dispatch<SetStateAction<MarkerPositionType | null>>
}
export const PlaceAutocomplete = ({position, onUpdatePosition}: PlaceAutocompleteProps) => {
    const [placeOptions, setPlaceOptions] = useState<string[]>([])

    const [selectedPlace, setSelectedPlace] = useState<string | null>(null)

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
        if (position?.place) {
            setValue(position.place)
        }
    }, [setValue, position, init]);

    useEffect(() => {
        if (ready && 'OK' === status) {
            setPlaceOptions([...new Set([value, ...data.map(place => place.description)])])
        }
    }, [data, ready, status]);

    const onSelectionClosed = (e: SyntheticEvent, reason: string) => {

        switch (reason) {
            case 'selectOption': {
                if (position) {
                    console.log(selectedPlace)
                    const newPlace = selectedPlace ? selectedPlace : value
                    console.log(`new place ${newPlace}`)
                    onUpdatePosition(new MarkerPosition({...position, place: newPlace}))
                    setSelectedPlace(null)
                }
                break;
            }
            default: {
                console.log(reason)
            }
        }
    }

    const onSelectionChanged = (e: SyntheticEvent, newValue: string | null, reason: string) => {
        console.log(`selection changed: ${newValue}`)
        setSelectedPlace(newValue!)
    }

    return (
        <>
            <Autocomplete
                data-testid={'os-location-place'}
                filterOptions={(x) => x}
                autoComplete
                freeSolo
                includeInputInList
                renderInput={(params) =>
                    <TextField {...params} label={'Place'}/>}
                options={placeOptions}
                onInputChange={(e: SyntheticEvent, newValue: string) => {
                    setValue(newValue)
                }}
                onClose={onSelectionClosed}
                onHighlightChange={onSelectionChanged}
                value={value}
                noOptionsText={'Start typing to find place'}
            />
        </>
    )
}
