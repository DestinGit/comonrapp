//Définition des modules
import express from "express";
import { Request, Response } from "express";

import bodyParser from "body-parser";
import { router } from './routes/router';
import DBMongoose from "./db/db";

export default class Server {

    readonly port: number;
    // private _app: any;

    constructor (port: number) {
        this.port = port;
        // this._app = express();
    }

    start () {
        DBMongoose.getConnection("mongodb://localhost/db");

        const app = express();
        const urlEncodedParser = bodyParser.urlencoded({
            extended: true
        });

        app.use(urlEncodedParser);
        app.use(bodyParser.json());

        //Définition des CORS
        app.use((req:Request, res:Response, next) => {
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Credentials', 1);
            next();
        });

        //Définition du routeur
        // app.use('/user', router);
        app.use(router);
        
        app.listen(this.port, () => console.log(`Listening on port ${this.port}`));
    }
}