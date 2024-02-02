import {assertAttributeExists, assertAttributeType_number} from "../util/attribute_assertions";
import {DisplayableJsonError} from "../displayableErrors/DisplayableJsonError";

export class Account {
    private _email: string;
    private _name: string;
    private _amount: number;
    private _pwd?: string;


    public constructor(uniqueEmail: string, name: string, amount: number, pwd?: string) {
        assertAttributeExists(uniqueEmail, "email");
        assertAttributeExists(name, "name");
        assertAttributeType_number(amount, "amount");
        if (pwd && pwd.trim().length === 0){
            throw new DisplayableJsonError(400, "pwd cannot be blank")
        }

        this._email = uniqueEmail;
        this._name = name;
        this._amount = amount;
        this._pwd = pwd;
    }

    //#region public methods
    public getDisplayableCopy(): Account{
        return new Account(this._email, this._name, this._amount);
    }

    public create(): Account{
        //assert email is unique thanks to DAO - todo
        assertAttributeExists(this._pwd, "pwd")
        return this
    }

    public update(actualEmail: string): Account{
        //assert actualEmail account exists thanks to DAO - todo
        return this
    }
    //#endregion

    //#region static methods
    public static getAccount(email: string): Account{
        return new Account(email, "name_of"+email, 5, "pwd")
    }

    static getAll(): Account[] {
        return [
            new Account("account_1", "2", 5),
            new Account("account_2", "2", 5)
        ];
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