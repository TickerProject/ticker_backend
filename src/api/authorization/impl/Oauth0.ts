import {Authorization} from "../Authorization";
import e, {Express} from "express";
import {auth} from "express-oauth2-jwt-bearer";

export class Oauth0 extends Authorization {
    init(app: Express) {

        app.use(auth({
            jwksUri: 'http://issuer.example.com/well-known/jwks.json',
            issuer: 'http://issuer.example.com',
            audience: 'https://myapi.com'
        }));
    }

}