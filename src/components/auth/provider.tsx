import {Auth0Provider} from "@auth0/auth0-react";

type AuthProviderProps = {
    children: React.ReactNode,
}

export const AuthProvider = ({children}: AuthProviderProps) => {
    const domain = process.env.REACT_APP_AUTH_DOMAIN!;
    return (
        <Auth0Provider
            domain={domain}
            clientId="iIVfd4LDP8cid6yJAf0ZWcsUHZQ4qX2o"
            authorizationParams={{
                redirect_uri: window.location.origin,
                audience: `https://${domain}/api/v2/`,
                scope: "profile email profile update:current_user_metadata read:current_user"
            }}
        >
            {children}
        </Auth0Provider>
    )
}

export default AuthProvider;