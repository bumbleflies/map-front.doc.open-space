import {LoaderFunction, useMatches} from "react-router-dom";
import {Dispatch, SetStateAction, useEffect} from "react";

type DataFromMatcherProps<T> = {
    id:string,
    stateSetter: Dispatch<SetStateAction<T>>
}
export const useDataFromMatcher = <T>(props: DataFromMatcherProps<T>): T => {
    const matches = useMatches()

    useEffect(() => {
        const matchedData = matches.find(m => m.id === 'd')!.data as T
        props.stateSetter(matchedData)
    }, [matches, props.stateSetter])

        console.log(`Loading data from matches: ${matches}`)
    return (matches.find(m => m.id === props.id)?.data) as T

}
