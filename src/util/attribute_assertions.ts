import {MissingAttributeError} from "../displayableErrors/MissingAttributeError";
import {UnexpectedAttributeTypeError} from "../displayableErrors/UnexpectedAttributeTypeError";

export function assertAttributeExists(attribute: any, attributeName: string){
    if (!attribute){
        throw new MissingAttributeError(attributeName)
    }
}

export function assertAttributeType_number(attribute: any, attributeName: string): void{
    if ( typeof attribute !== "number"){
        throw new UnexpectedAttributeTypeError(attributeName, "number")
    }
}