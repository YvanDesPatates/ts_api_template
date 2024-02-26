import {JsonDAO} from "../JsonDAO";
import {AccountLogic} from "./AccountLogic";

export class AccountJsonDAO extends JsonDAO<AccountLogic> {
    getFileName(): string {
        return "accounts.json";
    }

    protected compareElementToId(element: AccountLogic, id: string): boolean {
        return element.email === id;
    }
}