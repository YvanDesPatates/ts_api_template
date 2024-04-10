import {DAOInterface} from "../../DAOInterface";
import {AccountDBModel} from "./AccountDBModel";
import {AccountJsonDAO} from "./accountJsonDAO";

export default interface AccountDaoInterface extends DAOInterface<AccountDBModel>{

}

export function getAccountDAO(): AccountDaoInterface{
    return new AccountJsonDAO();
}