import {useMatches} from "react-router-dom";
import {Dispatch, SetStateAction, useEffect, useState} from "react";

type DataFromMatcherProps<T> = {
    id: string,
}

export const useDataFromMatcher = <T>({id}: DataFromMatcherProps<T>): T|null => {
    const matches = useMatches()

    const [matched,setMatched]=useState<T|null>(null)

    useEffect(() => {
        const matchedData = matches.find(m => m.id === id)!.data as T;
        console.log(`Loading data from matches: ${JSON.stringify(matchedData)}`)
        setMatched(matchedData)
    }, [matches,, id])

    return matched

}
