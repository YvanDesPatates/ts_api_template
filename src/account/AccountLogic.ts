import {assertAttributeExists, assertAttributeType_number} from "../util/attribute_assertions";
import {DisplayableJsonError} from "../displayableErrors/DisplayableJsonError";
import {LogicInterface} from "../LogicInterface";
import {AccountJsonDAO} from "./accountJsonDAO";
import {AccountDTO} from "./AccountDTO";
import {AccountDBModel} from "./AccountDBModel";
import {DAOInterface} from "../DAOInterface";

export class AccountLogic implements LogicInterface {
    private _email: string;
    private _name: string;
    private _amount: number;
    private _pwd?: string;

    private _accountJsonDAO: DAOInterface<AccountDBModel> = new AccountJsonDAO();


    public constructor(uniqueEmail: string, name: string, amount: number, pwd?: string) {
        assertAttributeExists(uniqueEmail, "email");
        assertAttributeExists(name, "name");
        assertAttributeExists(amount, "amount");
        assertAttributeType_number(amount, "amount");
        if (pwd && pwd.trim().length === 0) {
            throw new DisplayableJsonError(400, "pwd cannot be blank");
        }

        this._email = uniqueEmail;
        this._name = name;
        this._amount = amount;
        this._pwd = pwd;
    }


    //#region public methods
    public getDisplayableCopy(): AccountDTO {
        return {
            email: this.email,
            name: this.name,
            amount: this.amount
        };
    }

    /**
     * Even if it's not required to construct an account object, pwd is required to save it in database
     */
    public create(): AccountLogic {
        assertAttributeExists(this._pwd, "pwd");
        this.assertEmailDoesNotExistsInDatabase(this._email);
        return this._accountJsonDAO.create(this.toDBModel()).toLogic();
    }

    /**
     * Update the account by deleting the old one and creating a new one, pwd field is required.
     * @param actualEmail is the email of the account to update, after the update the email could be different
     */
    public update(actualEmail: string): AccountLogic {
        AccountLogic.assertEmailExistsInDatabase(this._accountJsonDAO, actualEmail);
        this._accountJsonDAO.delete(actualEmail);
        return this.create();
    }

    public delete(): void {
        AccountLogic.assertEmailExistsInDatabase(this._accountJsonDAO, this._email);
        if ( ! this._accountJsonDAO.delete(this._email) ){
            throw new DisplayableJsonError(500, "Error when deleting account");
        }
    }
    //#endregion

    //#region static methods
    public static getAccount(email: string): AccountLogic {
        AccountLogic.assertEmailExistsInDatabase(new AccountJsonDAO(), email);
        const account = new AccountJsonDAO().getById(email);
        if ( ! account){ throw new DisplayableJsonError(500, "Error when getting account"); }
        return account.toLogic();
    }

    static getAll(): AccountLogic[] {
        return new AccountJsonDAO().getAll().map(accountDBModel => accountDBModel.toLogic());
    }
    //#endregion

    //#region private methods
    private assertEmailDoesNotExistsInDatabase(email: string): void {
        if (this._accountJsonDAO.idExists(email)) {
            throw new DisplayableJsonError(409, "Account already exists with email " + email);
        }
    }

    private static assertEmailExistsInDatabase(accountDAO: DAOInterface<AccountDBModel>, email: string): void {
        if (!accountDAO.idExists(email)) {
            throw new DisplayableJsonError(404, "Account not found with the email " + email);
        }
    }

    private toDBModel(): AccountDBModel {
        if (!this.pwd) {
            throw new Error("can't create an AccountDBModel without pwd field")
        }
        return new AccountDBModel(this.email, this.name, this.amount, this.pwd);
    }
    //#endregion

    //#region getters
    get email(): string {
        return this._email;
    }

    get name(): string {
        return this._name;
    }

    get amount(): number {
        return this._amount;
    }

    get pwd(): string | undefined {
        return this._pwd;
    }
    //#endregion
}