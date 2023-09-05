import {useParams} from "react-router-dom";
import React from "react";
import {OsSessionsOverview} from "./osSessionsOverview";
import {OsSessionView} from "./osSessionView";


export const OsSessionsTab = () => {
    const {session_id} = useParams<"session_id">()

    return (
        <>
            {session_id === undefined ?
                <OsSessionsOverview/>
                :
                <OsSessionView/>
            }
        </>
    )
}
