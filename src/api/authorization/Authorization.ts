import {Express} from "express";

export abstract class Authorization {

    abstract init(app: Express);

}