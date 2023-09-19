import {useNavigate, useSearchParams} from "react-router-dom";
import React, {useEffect} from "react";

export const Redirect = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    useEffect(() => {
        const redirectURI = searchParams.get('next')
        if (redirectURI !== null) {
            console.log(`redirect to ${redirectURI}`)
            navigate(redirectURI)
        }
    }, [searchParams, navigate])
    return (<></>)
};
