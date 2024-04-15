import {assertAttributeExists, assertAttributeType_number} from "../util/attribute_assertions";
import bcrypt from 'bcrypt';
import {DisplayableJsonError} from "../displayableErrors/DisplayableJsonError";
import {LogicInterface} from "../LogicInterface";
import {AccountDTO} from "./AccountDTO";
import {AccountDBModel} from "./DAL/AccountDBModel";
import AccountDaoInterface, {getAccountDAO} from "./DAL/AccountDaoInterface";

export class AccountLogic implements LogicInterface {
    private _email: string;
    private _name: string;
    private _amount: number;
    private _pwd?: string;

    private _accountJsonDAO: AccountDaoInterface = getAccountDAO();
    private readonly _saltRounds: number = 10;

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
    public async create(): Promise<AccountLogic> {
        assertAttributeExists(this._pwd, "pwd");
        this._pwd = await bcrypt.hash(<string>this.pwd, this._saltRounds);
        await this.assertEmailDoesNotExistsInDatabase(this._email);
        const createdAccount = await this._accountJsonDAO.create(this.toDBModel());
        return createdAccount.toLogic();
    }

    /**
     * Update the account by deleting the old one and creating a new one, pwd field is required.
     * @param actualEmail is the email of the account to update, after the update the email could be different
     */
    public async update(actualEmail: string): Promise<AccountLogic> {
        await AccountLogic.assertEmailExistsInDatabase(this._accountJsonDAO, actualEmail);
        assertAttributeExists(this._pwd, "pwd");

        const accountToUpdate = await this._accountJsonDAO.getById(actualEmail);
        if (actualEmail !== this.email){
            await this.assertEmailDoesNotExistsInDatabase(this._email);
        }
        //if the password change we have to encrypt it
        accountToUpdate.pwd = this.pwd === accountToUpdate.pwd ? this.pwd : await bcrypt.hash(<string>this.pwd, this._saltRounds);
        const updatedAccount = await this._accountJsonDAO.update(actualEmail, this.toDBModel());
        return updatedAccount.toLogic();
    }

    public async delete(): Promise<void> {
        await AccountLogic.assertEmailExistsInDatabase(this._accountJsonDAO, this._email);
        if ( ! await this._accountJsonDAO.delete(this._email) ){
            throw new DisplayableJsonError(500, "Error when deleting account");
        }
    }
    //#endregion

    //#region static methods
    public static async getAccount(email: string): Promise<AccountLogic> {
        await AccountLogic.assertEmailExistsInDatabase(getAccountDAO(), email);
        const account = await getAccountDAO().getById(email);
        return account.toLogic();
    }

    static async getAll(): Promise<AccountLogic[]> {
        const accounts = await getAccountDAO().getAll();
        return await Promise.all(accounts.map(async account => account.toLogic()));
    }
    //#endregion

    //#region private methods
    private async assertEmailDoesNotExistsInDatabase(email: string): Promise<void> {
        if ( await this._accountJsonDAO.idExists(email)) {
            throw new DisplayableJsonError(409, "Account already exists with email " + email);
        }
    }

    private static async assertEmailExistsInDatabase(accountDAO: AccountDaoInterface, email: string): Promise<void> {
        if (! await accountDAO.idExists(email)) {
            throw new DisplayableJsonError(404, "Account not found with the email " + email);
        }
    }

    private toDBModel(): AccountDBModel {
        if (!this.pwd) {
            throw new Error("can't create an AccountDBModel without pwd field");
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