import {Authorization} from "../Authorization";
import {Express, Handler} from "express";
import {auth} from "express-oauth2-jwt-bearer";
import {Utils} from "../../../utils/Utils";

export class Oauth0 extends Authorization {

    create(app: Express): Handler {
        const { audience,  issuerBaseURL} = Utils.getAuthorConfig().oauth;
        const checkJwt = auth({
            jwksUri: `https://${issuerBaseURL}/well-known/jwks.json`,
            issuer: issuerBaseURL,
            audience: audience
        });

        app.use(checkJwt)

        return checkJwt;
    }

}