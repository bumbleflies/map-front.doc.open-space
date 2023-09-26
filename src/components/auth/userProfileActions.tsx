import {useAuth0} from "@auth0/auth0-react";
import {Button} from "@mui/material";
import React from "react";
import {UserMenu} from "./userMenu";
import {useLoginMethod} from "./hooks";

const UserLogin = () => {

    const {loginMethod} = useLoginMethod()

    return (
        <Button data-testid={'user-login-button'} color={"inherit"} onClick={loginMethod}>
            Login
        </Button>
    )
}

export const UserProfileActions = () => {
    const {isAuthenticated} = useAuth0()

    return isAuthenticated ? <UserMenu/> : <UserLogin/>
}

export default UserProfileActions
