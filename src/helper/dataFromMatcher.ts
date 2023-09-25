import {useMatches} from "react-router-dom";
import {useEffect, useState} from "react";

type DataFromMatcherProps = {
    id: string,
}

export const useDataFromMatcher = <T>({id}: DataFromMatcherProps): T|null => {
    const matches = useMatches()

    const [matched,setMatched]=useState<T|null>(null)

    useEffect(() => {
        const matchedData = matches.find(m => m.id === id)!.data as T;
        console.log(`Loading data from matches: ${JSON.stringify(matchedData)}`)
        setMatched(matchedData)
    }, [matches, id])

    return matched

}
