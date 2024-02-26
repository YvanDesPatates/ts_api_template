import {DisplayableInterface} from "../DisplayableInterface";
import {AccountModel} from "./AccountModel";
import {ModelInterface} from "../ModelInterface";

export class DisplayableAccount extends DisplayableInterface {
    public email: string = "";
    public name: string = "";
    public amount: number = 0;

    protected buildFromObject(objectToDisplay: AccountModel){
        this.email = objectToDisplay.email;
        this.name = objectToDisplay.name;
        this.amount = objectToDisplay.amount;
    }

}
