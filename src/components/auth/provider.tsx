import {Auth0Provider} from "@auth0/auth0-react";

type AuthProviderProps = {
    children: React.ReactNode,
}
export const AuthProvider = ({children}: AuthProviderProps) => {
    return (
        <Auth0Provider
            domain="bumbleauth.eu.auth0.com"
            clientId="iIVfd4LDP8cid6yJAf0ZWcsUHZQ4qX2o"
            authorizationParams={{
                redirect_uri: window.location.origin
            }}
        >
            {children}
        </Auth0Provider>
    )
}

export default AuthProvider;