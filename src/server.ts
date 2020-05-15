//Définition des modules
import express from "express";
import { Request, Response } from "express";

import bodyParser from "body-parser";
import { router } from './config/routes';
import DBMongoose from "./db/db";

export default class Server {

    readonly port: number;
	private srv: any;

    constructor (port: number) {
        this.port = port;
		this.srv = null;
    }

	private processHandler() {
		// process.on('SIGTERM', () => {
		// 	this.srv.close(() => console.log('Close SIGTERM ffffffffff========================='));		
		// });

		process.on('uncaughtException', (err) => {
			// console.error(`Caught exception: ${err.message}\n`);
			this.srv.close();
			// this.srv.close(() => console.log('Serveur fermé ....'));
		});

		// process.on('SIGINT', () => {
		// 	this.srv.close(() => console.log('Close SIGINT========================='));		
		// });
	}

    start () {
		console.log('Démarrage du serveur ....');
		
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
        app.use(router);
		
		this.srv = app.listen(this.port, () => console.log(`Listening on port ${this.port}`));

		this.processHandler();
	}
	
	close (cb?:Function) {
		if (this.srv) {
			this.srv.close(() => {
				if (cb) {
					cb();
				}
			});
		}
	}

}