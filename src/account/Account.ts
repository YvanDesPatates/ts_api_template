export class Account {
    private email: string;
    private name: string;
    private pwd?: string;


    public constructor(uniqueEmail: string, name: string, pwd?: string) {
        this.email = uniqueEmail;
        this.name = name;
        this.pwd = pwd;
    }

    public getCopyWithoutPwd(): Account{
        return new Account(this.email, this.name);
    }
}