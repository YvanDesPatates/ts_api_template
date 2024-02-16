import {NextFunction, Request, Response, Send} from "express";
import {isInstanceOfModelinterface, ModelInterface} from "./ModelInterface";

/**
 * This middleware is used to automatically parse the response body to displayable copy if it is a ModelInterface.
 */
export const ParsingResponseBodyMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const originalJsonFunction = res.json;
    res.json = function (data): Response {
        if (isInstanceOfModelinterface(data)) {
            data = data.getDisplayableCopy()
        }
        return originalJsonFunction.call(this, data);
    }


    next();
};
