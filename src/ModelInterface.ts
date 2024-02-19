/**
 * interface of all models used to automatically apply `getDisplayableCopy` when parsing the response body
 */
export interface ModelInterface {
    getDisplayableCopy(): ModelInterface
}

export function isInstanceOfModelinterface(object: any): object is ModelInterface {
    if (object === null || object === undefined) { return false; }
    if (typeof object !== 'object') { return false; }
    if ( Array.isArray(object) ) { return false; }
    const hasDisplayableCopyMethod: boolean = ( 'getDisplayableCopy' in object && typeof object.getDisplayableCopy === 'function');
    return hasDisplayableCopyMethod;
}