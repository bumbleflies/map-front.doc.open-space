import {useMatches} from "react-router-dom";
import {Dispatch, SetStateAction, useEffect} from "react";

type DataFromMatcherProps<T> = {
    id: string,
    stateSetter: Dispatch<SetStateAction<T>>
}

export const useDataFromMatcher = <T>({id, stateSetter}: DataFromMatcherProps<T>): void => {
    const matches = useMatches()

    useEffect(() => {
        const matchedData = matches.find(m => m.id === id)!.data as T;
        console.log(`Loading data from matches: ${JSON.stringify(matches)}: ${JSON.stringify(matchedData)}`)
        stateSetter(matchedData)
    }, [matches, stateSetter, id])

}
