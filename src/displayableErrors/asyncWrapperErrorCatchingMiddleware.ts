import {NextFunction, Request, Response} from "express";

/**
 * Used to wrap ASYNC controller functions in route files. This allows to simply throw errors even in async functions and ensure that errors will be pass to the ErrorHandler middleware using next() method.
 */
export const asyncWrapper = (AsyncFunction: (req: Request, res: Response, next: NextFunction) => Promise<void>, controller: object) =>
    (req: Request, res: Response, next: NextFunction) => AsyncFunction.bind(controller)(req, res, next).catch(next);