import {assertAttributeExists, assertAttributeType_number} from "../util/attribute_assertions";

export class Account {
    private email: string;
    private name: string;
    private amount?: number;
    private pwd?: string;


    public constructor(uniqueEmail: string, name: string, amount?: number, pwd?: string) {
        assertAttributeExists(uniqueEmail, "email");
        assertAttributeExists(name, "name");
        assertAttributeType_number(amount, "amount");

        this.email = uniqueEmail;
        this.name = name;
        this.amount = amount;
        this.pwd = pwd;
    }

    public getCopyWithoutPwd(): Account{
        return new Account(this.email, this.name, this.amount);
    }


}