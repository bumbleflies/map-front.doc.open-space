import {User} from "@auth0/auth0-react";
import axios from "axios";


export class Auth0ApiService {
    authEndpoint: string;

    constructor() {
        this.authEndpoint = process.env.REACT_APP_AUTH_DOMAIN!
    }

    async getUserMetadataName(user: User, accessToken: string): Promise<string> {
        return axios.get(this.getUserDetailsEndpoint(user), this.getHeader(accessToken)).then((response) => {
            return response.data.user_metadata?.name;
        })
    }

    async updateUserMetadataName(user: User, newName: string, accessToken: string) {
        return axios.patch(this.getUserDetailsEndpoint(user), {user_metadata: {name: newName}},
            this.getHeader(accessToken));
    }

    private getHeader(accessToken: string) {
        return {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
    }

    private getUserDetailsEndpoint(user: User) {
        return `https://${this.authEndpoint}/api/v2/users/${user!.sub}`;
    }
}
