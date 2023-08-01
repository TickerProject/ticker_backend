import configJSon from '../resources/config.json';
import authorizationJson from '../resources/authorization.json';
import winston from 'winston';

enum EnvironmentType {
    Development = 'dev',
    Staging = 'stg',
    Production = 'prod',
}

export class Utils {
    private static LOGGER: winston.Logger;
    private static SERVICE_NAME: string = 'TICKER_SERVER';

    private constructor() {
    }

    private static createLogger(): winston.Logger {
        const { logLevel, type } = Utils.getEnvConfig();
        const logger : winston.Logger = winston.createLogger({
            level: logLevel,
            format: winston.format.json(),
            defaultMeta: {service: Utils.SERVICE_NAME},
            transports: [
                // TODO JSON elastic format
                new winston.transports.File({filename: 'error.log', level: 'error'}),
                new winston.transports.File({filename: 'combined.log'}),
            ],
        });

        if (type == EnvironmentType.Development) {
            logger.add(new winston.transports.Console({
                format: winston.format.simple(),
            }));
        }

        return logger;
    }

    static getAppConfig(): any {
        return configJSon.app;
    }

    static getEnvConfig(): any {
        return configJSon.env;
    }

    static getLogger() :winston.Logger {
        if (!this.LOGGER) {
            this.LOGGER = this.createLogger();
        }

        return this.LOGGER;
    }

    static getAuthorConfig(): any {
        return authorizationJson;
    }
}

export const Logger: winston.Logger = Utils.getLogger();


