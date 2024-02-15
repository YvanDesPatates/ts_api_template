import {JsonDAO} from "../JsonDAO";
import {AccountModel} from "./AccountModel";

export class AccountJsonDAO extends JsonDAO<AccountModel> {
    getFileName(): string {
        return "accounts.json";
    }
}