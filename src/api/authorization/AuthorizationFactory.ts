import {Authorization} from "./Authorization";
import {Oauth0} from "./impl/Oauth0";

export class AuthorizationFactory {

    private static instance : Authorization;

    private constructor() {}

    public static getInstance() {
        if(!this.instance) {
            this.instance = new Oauth0();
        }

        return this.instance;
    }
}