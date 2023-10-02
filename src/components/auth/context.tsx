import React, {createContext, useEffect, useState} from 'react';
import {Auth0ApiService} from "../../api/auth0Api";
import {useAuth0, User} from "@auth0/auth0-react";

export type UserMetadataContextType = {
    userMetadataName: string | null,
    updateUserMetadataName: (name: string) => Promise<string>,
    user: User | undefined
}
export const UserMetadataContext = createContext<UserMetadataContextType>(
    {
        userMetadataName: null, updateUserMetadataName: () => {
            return Promise.resolve('')
        },
        user: undefined
    });

type UserMetadataContextProviderProps = {
    children: React.ReactNode
}

export const UserMetadataContextProvider = ({children}: UserMetadataContextProviderProps) => {
    const [userMetadataName, setUserMetadataName] = useState<string | null>(null)
    const authService = new Auth0ApiService()
    const {isAuthenticated, getAccessTokenSilently, user} = useAuth0()

    useEffect(() => {
        if (isAuthenticated && user !== undefined) {
            getAccessTokenSilently().then((accessToken) => {
                return authService.getUserMetadataName(user, accessToken)
            }).then((userMetadataName) => {
                setUserMetadataName(userMetadataName)
            })
        }

    }, [authService])

    const updateUserMetadataName = async (newName: string) => {
        if (newName !== null) {
            return getAccessTokenSilently().then((accessToken) =>
                authService.updateUserMetadataName(user!, newName, accessToken)
                    .then(() => {
                        setUserMetadataName(newName)
                        return newName
                    }))
        } else {
            return Promise.resolve('')
        }
    }

    return (
        <UserMetadataContext.Provider
            value={{userMetadataName: userMetadataName, updateUserMetadataName: updateUserMetadataName, user: user}}>
            {children}
        </UserMetadataContext.Provider>
    )
}

export default UserMetadataContextProvider
