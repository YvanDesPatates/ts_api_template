import {LogicInterface} from "./LogicInterface";

export abstract class DTOInterface {
    constructor(objectToDisplay: LogicInterface){
        this.buildFromObject(objectToDisplay);
    }

    protected abstract buildFromObject(objectToDisplay: LogicInterface): void;
}