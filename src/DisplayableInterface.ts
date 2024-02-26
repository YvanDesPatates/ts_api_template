import {ModelInterface} from "./ModelInterface";

export abstract class DisplayableInterface  {
    constructor(objectToDisplay: ModelInterface){
        this.buildFromObject(objectToDisplay);
    }

    protected abstract buildFromObject(objectToDisplay: ModelInterface): void;
}