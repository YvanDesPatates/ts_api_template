import {DisplayableJsonError} from "./DisplayableJsonError";

export class UnexpectedAttributeTypeError extends DisplayableJsonError {
    constructor(attributeName: string, expectedType: string) {
        super(400, "attribute '" + attributeName+"' should be of type : "+expectedType);
    }
}