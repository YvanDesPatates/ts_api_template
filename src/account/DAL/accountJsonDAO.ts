import {JsonDAO} from "../../JsonDAO";
import {AccountDBModel} from "./AccountDBModel";
import AccountDaoInterface from "./AccountDaoInterface";

export class AccountJsonDAO extends JsonDAO<AccountDBModel> implements AccountDaoInterface {
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