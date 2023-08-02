import {Express} from "express";

export abstract class Authorization {

    abstract create(app: Express);

}