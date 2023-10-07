import React, {createContext, useMemo, useState} from 'react';
import {Auth0ApiService} from "../../api/auth0Api";
import {useAuth0, User} from "@auth0/auth0-react";

export type UserMetadataContextType = {
    userMetadataName: string | null,
    updateUserMetadataName: (name: string) => Promise<string>,
    user: User | undefined,
    accessToken: string | undefined // token for audience: 'https://open-space-app/api'
    setAccessToken: React.Dispatch<React.SetStateAction<string | undefined>>
}

export const UserMetadataContext = createContext<UserMetadataContextType>(
    {
        userMetadataName: null, updateUserMetadataName: () => {
            return Promise.resolve('')
        },
        user: undefined,
        accessToken: undefined,
        setAccessToken: () => null
    });

type UserMetadataContextProviderProps = {
    children: React.ReactNode
}

export const UserMetadataContextProvider = ({children}: UserMetadataContextProviderProps) => {
    const [userMetadataName, setUserMetadataName] = useState<string | null>(null)
    const [accessToken, setAccessToken] = useState<string | undefined>(undefined)
    const {getAccessTokenSilently, user} = useAuth0()
    const authService = useMemo(() => new Auth0ApiService(), [])

    const updateUserMetadataName = async (newName: string) => {
        if (newName !== null) {
            // get the default token
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
            value={{
                userMetadataName: userMetadataName,
                updateUserMetadataName: updateUserMetadataName,
                user: user,
                accessToken: accessToken,
                setAccessToken: setAccessToken
            }}>
            {children}
        </UserMetadataContext.Provider>
    )
}

export default UserMetadataContextProvider
