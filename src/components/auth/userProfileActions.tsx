import {useAuth0} from "@auth0/auth0-react";
import {Button} from "@mui/material";
import React from "react";
import {UserMenu} from "./userMenu";
import {useSearchParams} from "react-router-dom";

const UserLogin = () => {
    const {loginWithPopup, loginWithRedirect} = useAuth0()
    const [searchParams] = useSearchParams()

    const loginWithUsernamePassword=()=>
        loginWithRedirect({
                authorizationParams: {
                    connection: 'Username-Password-Authentication',
                },
            })


    const loginWithEmailCode=()=> loginWithPopup({
                authorizationParams: {
                    connection: 'email',
                },
            })

    const loginMethod=()=> {
        return searchParams.get('logintype') === 'usernamepassword' ?
            loginWithUsernamePassword:loginWithEmailCode
    }
    return (
            <Button data-testid={'user-login-button'} color={"inherit"} onClick={loginMethod()}>
                Login
            </Button>
    )
}

export const UserProfileActions = () => {
    const {isAuthenticated} = useAuth0()

    return isAuthenticated ? <UserMenu/> : <UserLogin/>
}

export default UserProfileActions
