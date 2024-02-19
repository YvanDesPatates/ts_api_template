import {NextFunction, Request, Response} from "express";
import {isInstanceOfModelinterface} from "./ModelInterface";

/**
 * This middleware is used to automatically parse the response body to displayable copy if it is a ModelInterface.
 */
export const ParsingResponseBodyMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const originalJsonFunction = res.json;
    res.json = function (data): Response {
        if (Array.isArray(data)){
            data = data.map((element: any) => getDisplayableCopyIfInstanceOfModelInterface(element));
        }
        data = getDisplayableCopyIfInstanceOfModelInterface(data);
        return originalJsonFunction.call(this, data);
    };


    next();
};

/**
 * This function return displayable copy of the object if it is a ModelInterface implementation.
 */
function getDisplayableCopyIfInstanceOfModelInterface(object: any) {
    if (isInstanceOfModelinterface(object)) {
        return  object.getDisplayableCopy();
    }
    return object;
}
