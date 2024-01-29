import {DisplayableJsonError} from "./DisplayableJsonError";

export class MissingRequiredParamError extends DisplayableJsonError {
    constructor(paramName: string) {
        super(400, "missing required param : " + paramName);
    }
}