import {useAuth0} from "@auth0/auth0-react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";

export const useRedirectIfNotAuthenticated = () => {
    const {isAuthenticated, isLoading} = useAuth0()
    const navigate = useNavigate()
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate('/')
        }
    }, [navigate, isAuthenticated, isLoading]);

}
export const useLoginMethod = () => {
    const [searchParams] = useSearchParams()
    const {loginWithPopup, loginWithRedirect} = useAuth0()
    const loginWithUsernamePassword = () =>
        loginWithRedirect({
            authorizationParams: {
                connection: 'Username-Password-Authentication',
            },
        })


    const loginWithEmailCode = () => loginWithPopup({
        authorizationParams: {
            connection: 'email',
        },
    })

    const loginMethod = () => {
        return searchParams.get('logintype') === 'usernamepassword' ?
            loginWithUsernamePassword : loginWithEmailCode
    }

    return {loginMethod: loginMethod()}
}

export const useBackendAuth = () => {
    const {getAccessTokenWithPopup, getAccessTokenSilently} = useAuth0()

    const getAccessToken = async (options: { authorizationParams: { audience: string } }) => {
        return getAccessTokenSilently(options).catch((reson: any) => getAccessTokenWithPopup(options))
    }

    return {
        withAccessToken: (): Promise<string | undefined> => getAccessToken({
            authorizationParams: {
                audience: 'https://open-space-app/api',
            }
        })
    }
}
