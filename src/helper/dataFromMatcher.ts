import {LoaderFunction, useMatches} from "react-router-dom";
import {Dispatch, SetStateAction, useEffect} from "react";

type DataFromMatcherProps<T> = {
    id:string,
    stateSetter: Dispatch<SetStateAction<T>>
}
export const useDataFromMatcher = <T>(props: DataFromMatcherProps<T>): T => {
    const matches = useMatches()

    useEffect(() => {
        const matchedData = matches.find(m => m.id === props.id)!.data as T
        console.log(`Loading data from matches: ${JSON.stringify(matches)}: ${JSON.stringify(matchedData)}`)
        props.stateSetter(matchedData)
    }, [matches, props.stateSetter])

    return (matches.find(m => m.id === props.id)?.data) as T

}
