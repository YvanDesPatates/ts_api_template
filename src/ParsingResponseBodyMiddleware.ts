import {NextFunction, Request, Response} from "express";
import {isInstanceOfModelinterface} from "./ModelInterface";

export const ParsingResponseBodyMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const oldSend = res.send;
    res.send = function (data) {
        if ( isInstanceOfModelinterface(data) ) {
            data = data.getDisplayableCopy()
        }
        oldSend.call(this, data);
    };
    next();
};
