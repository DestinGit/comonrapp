import { Response, Request } from 'express';

class UserCtrl {
    constructor() {}
    index(req:Request, res:Response) {
        res.send('BOZI BOZIANA');
    }
}

export const userCr = new UserCtrl();