import {Request, Response} from "express";
import {DisplayableJsonError} from "./DisplayableJsonError";

export const errorHandlerMiddleware = (err: Error, req: Request, res: Response) => {
    console.error(err);

    if (err instanceof DisplayableJsonError){
        res.status(err.statusCode).send(err.toJSON());
        return;
    }
    const displayableError = new DisplayableJsonError(500, "unexpected internal error");
    res.status(500).send(displayableError.toJSON());
};
