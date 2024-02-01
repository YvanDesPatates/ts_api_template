import {DisplayableJsonError} from "./DisplayableJsonError";

export class MissingAttributeError extends DisplayableJsonError {
    constructor(attributeName: string) {
        super(400, "given object is missing a required attribute : " + attributeName);
    }
}