/**
 * interface of all models used to automatically apply `getDisplayableCopy` when parsing the response body
 */
export interface LogicInterface {
    getDisplayableCopy(): object
}

export function isInstanceOfModelinterface(object: object): object is LogicInterface {
    if (object === null || object === undefined) { return false; }
    if (typeof object !== 'object') { return false; }
    if ( Array.isArray(object) ) { return false; }
    const hasDisplayableCopyMethod: boolean = ( 'getDisplayableCopy' in object && typeof object.getDisplayableCopy === 'function');
    return hasDisplayableCopyMethod;
}