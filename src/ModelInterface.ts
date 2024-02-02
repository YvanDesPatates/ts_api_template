    export interface ModelInterface {
        getDisplayableCopy(): ModelInterface
    }

export function isInstanceOfModelinterface(object: any): object is ModelInterface {
    const hasDisplayableCopyMethod: boolean = ! ( 'getDisplayableCopy' in object && typeof object.getDisplayableCopy === 'function')
    return hasDisplayableCopyMethod
}