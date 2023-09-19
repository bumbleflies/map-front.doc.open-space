import {useAuth0} from "@auth0/auth0-react";
import {Button} from "@mui/material";
import React from "react";
import {UserMenu} from "./userMenu";

const UserLogin = () => {
    const {loginWithPopup} = useAuth0()
    return (
        <Button color={"inherit"} onClick={() => loginWithPopup({
            authorizationParams: {
                connection: 'email',
            },

        })}>
            Login
        </Button>
    )
}

export const UserProfileActions = () => {
    const {isAuthenticated} = useAuth0()

    return isAuthenticated ? <UserMenu/> : <UserLogin/>
}

export default UserProfileActions
