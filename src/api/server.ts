import 'reflect-metadata';
// import 'module-alias/register';

import express, {Express} from 'express';
import bodyParser from 'body-parser';
import Container from 'typedi';
import {Utils, Logger} from "../utils/Utils";
import {
    useExpressServer,
    useContainer as routingContainer
} from 'routing-controllers';
import {UserController, AuthorizationController} from './controllers'
import audit from 'express-requests-logger'
import {AuthorizationFactory} from "./authorization/AuthorizationFactory";
import {Authorization} from "./authorization/Authorization";

const {apiRoot, port} = Utils.getAppConfig();

/**
 * Create express server
 * @returns {Express} - creates and configure Express
 */
function createConfigureServer(): Express {
    // create app
    const app = express();
    // get configs

    // const baseDir = __dirname;

    // container
    routingContainer(Container);

    const controllers = [];
    controllers.push(UserController);

    if (!Utils.isDevEnv()) { // TODO
        const authorization: Authorization = AuthorizationFactory.getInstance();
        authorization.create(app);
        controllers.push(AuthorizationController);
    }

    useExpressServer(app,
        {
            routePrefix: apiRoot,
            defaultErrorHandler: false,
            controllers: controllers
        });

    if (Utils.isDevEnv()) {
        app.use(audit());
    }

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    app.use((req, res, next) => {
        Logger.info({ message: req.url });
        next();
    });



    return app;
}

function startServer(): void {
    const app: Express = createConfigureServer();
    // create server

    app.listen(port, () => {
        Logger.info({message: `Listening on port ${port}`});
    });

    // const request = http.request('http://localhost', function (req) {
    //    Logger.error("ERROR");
    // });

    // request.on('error', function (err: any) {
    //     const errors: Error[] = err.errors;
    //     errors.forEach(e => {
    //         Logger.error(e.message);
    //     });
    // });

    process.on('error', (error) => {
        Logger.error('Server', 'unhandledRejectionError :', `${error}`);
    });

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
    //
    // app.listen(port, () => {
    //     return console.log(`Ticker server is running on ${ hostname }:${ port }`);
    // });
}

export default { startServer };

