import {JsonDAO} from "../JsonDAO";
import {AccountDBModel} from "./AccountDBModel";

export class AccountJsonDAO extends JsonDAO<AccountDBModel> {
    getFileName(): string {
        return "accounts.json";
    }

    protected compareElementToId(element: AccountDBModel, id: string): boolean {
        return element.email === id;
    }


    protected parseAnyFromDB(objectToParse: any): AccountDBModel {
        return new AccountDBModel(objectToParse.email, objectToParse.name, objectToParse.amount, objectToParse.pwd);
    }
}