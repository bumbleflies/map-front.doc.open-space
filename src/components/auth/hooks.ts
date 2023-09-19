import {useAuth0} from "@auth0/auth0-react";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Auth0ApiService} from "../../api/auth0Api";

export const useUserMetadata = () => {
    const {isAuthenticated, getAccessTokenSilently, user} = useAuth0()
    const [authService] = useState<Auth0ApiService>(new Auth0ApiService())
    const [userMetadataName, setUserMetadataName] = useState<string>('')

    useEffect(() => {
        if (isAuthenticated && user) {
            getAccessTokenSilently().then((accessToken) =>
                authService.getUserMetadataName(user, accessToken).then((name) => {
                    setUserMetadataName(name)
                })
            )
        }
    }, [setUserMetadataName, isAuthenticated, user, getAccessTokenSilently, authService]);

    const updateUserMetadataName = async (newName: string) => {
        return getAccessTokenSilently().then((accessToken) =>
            authService.updateUserMetadataName(user!, newName, accessToken)
                .then(() => {
                    setUserMetadataName(newName)
                }))
    }

    return {userMetadataName: userMetadataName, updateUserMetadataName: updateUserMetadataName, user: user}
}
export const useRedirectIfNotAuthenticated = () => {
    const {isAuthenticated, isLoading} = useAuth0()
    const navigate = useNavigate()
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate('/')
        }
    }, [navigate, isAuthenticated, isLoading]);

}