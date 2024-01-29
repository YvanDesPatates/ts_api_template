export class Account {
    private mail: string;
    private name: string;
    private pwd?: string;


    public constructor(uniqueMail: string, name: string, pwd?: string) {
        this.mail = uniqueMail;
        this.name = name;
        this.pwd = pwd;
    }

    public getCopyWithoutPwd(): Account{
        return new Account(this.mail, this.name);
    }
}