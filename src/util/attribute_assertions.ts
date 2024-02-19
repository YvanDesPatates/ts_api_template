import {MissingAttributeError} from "../displayableErrors/MissingAttributeError";
import {UnexpectedAttributeTypeError} from "../displayableErrors/UnexpectedAttributeTypeError";

export function assertAttributeExists(attribute: any, attributeName: string){
    if (!attribute){
        throw new MissingAttributeError(attributeName);
    }
}

/**
 * usefull to check if a data send by user is a number or not. String as number (ex :"44") will also raise an error.
 */
export function assertAttributeType_number(attribute: any, attributeName: string): void{
    if ( typeof attribute !== "number"){
        throw new UnexpectedAttributeTypeError(attributeName, "number");
    }
}