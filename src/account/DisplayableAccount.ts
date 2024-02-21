import {DisplayableInterface} from "../DisplayableInterface";
import {AccountModel} from "./AccountModel";

export class DisplayableAccount extends DisplayableInterface {
    public email: string;
    public name: string;
    public amount: number;

    public constructor(objectToDisplay: AccountModel){
        super(objectToDisplay);
        this.email = objectToDisplay.email;
        this.name = objectToDisplay.name;
        this.amount = objectToDisplay.amount;
    }
}
