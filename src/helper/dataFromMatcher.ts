import {useMatches} from "react-router-dom";
import {Dispatch, SetStateAction, useEffect} from "react";

type DataFromMatcherProps<T> = {
    id:string,
    stateSetter: Dispatch<SetStateAction<T>>
}
export const useDataFromMatcher = <T>({id,stateSetter}: DataFromMatcherProps<T>): T => {
    const matches = useMatches()

    function getMatchedData() {
        return matches.find(m => m.id === id)!.data as T;
    }

    useEffect(() => {
        const matchedData = getMatchedData()
        console.log(`Loading data from matches: ${JSON.stringify(matches)}: ${JSON.stringify(matchedData)}`)
        stateSetter(matchedData)
    }, [matches, stateSetter])

    return getMatchedData()
}
