import {useAuth0} from "@auth0/auth0-react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useContext, useEffect} from "react";
import {UserMetadataContext, UserMetadataContextType} from "./context";

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
    const {loginWithPopup, loginWithRedirect, getAccessTokenWithPopup} = useAuth0()
    const {setAccessToken} = useContext<UserMetadataContextType>(UserMetadataContext)

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
    }).then(() => getAccessTokenWithPopup({
        authorizationParams: {
            audience: 'https://open-space-app/api',
        }
    }).then((token) => setAccessToken(token)))

    const loginMethod = () => {
        return searchParams.get('logintype') === 'usernamepassword' ?
            loginWithUsernamePassword : loginWithEmailCode
    }

    return {loginMethod: loginMethod()}
}

export const useBackendAuth = (silently: boolean = false) => {
    const {accessToken, setAccessToken} = useContext<UserMetadataContextType>(UserMetadataContext)
    const {getAccessTokenSilently, isAuthenticated} = useAuth0()

    return {
        withAccessToken: async (silently: boolean = false): Promise<string | undefined> => {
            if (accessToken === undefined) {
                return getAccessTokenSilently({
                    authorizationParams: {
                        audience: 'https://open-space-app/api',
                    }
                }).then(accessToken => {
                    setAccessToken(accessToken)
                    return accessToken
                })
            } else {
                return Promise.resolve(accessToken)
            }
        }
    }
}
