import {DAOInterface} from "../../DAOInterface";
import {AccountDBModel} from "./AccountDBModel";
import {AccountMongoDAO} from "./AccountMongoDAO";

export default interface AccountDaoInterface extends DAOInterface<AccountDBModel>{

}

export function getAccountDAO(): AccountDaoInterface{
    return new AccountMongoDAO();
}