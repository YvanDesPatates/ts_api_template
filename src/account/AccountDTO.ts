import {DTOInterface} from "../DTOInterface";
import {AccountLogic} from "./AccountLogic";
import {LogicInterface} from "../LogicInterface";

export class AccountDTO extends DTOInterface {
    public email: string = "";
    public name: string = "";
    public amount: number = 0;

    protected buildFromObject(objectToDisplay: AccountLogic){
        this.email = objectToDisplay.email;
        this.name = objectToDisplay.name;
        this.amount = objectToDisplay.amount;
    }

}
