import {useRouteLoaderData} from "react-router-dom";

type DataFromMatcherProps = {
    id: string,
}

export const useDataFromMatcher = <T>({id}: DataFromMatcherProps): T | null => {
    return useRouteLoaderData(id) as T
}
