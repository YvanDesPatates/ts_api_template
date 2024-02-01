import {NextFunction, Request, Response} from "express";
import {Account} from "./Account";

export class AccountController {

    public async getAllAccounts(req: Request, res: Response, next: NextFunction): Promise<void> {
        const accounts: Account[] = [
           new Account("account_1", "2", 5),
            new Account("account_2", "2", 5)
        ];
        res.status(200).json(accounts);
    }

    public async getAccountById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const email = req.params.email;
        const account: Account = new Account(email, "name_of_"+email, 5).getDisplayableCopy();
        res.status(200).json(account);
    }

    public async createAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
        const accountToCreate: Account = new Account(req.body.email, req.body.name, req.body.amount, req.body.pwd);
        res.status(201).json(accountToCreate.create().getDisplayableCopy());
    }

    public async updateAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
        const actualEmail:string = req.params.email;
        const accountToUpdate: Account = Account.getAccount(actualEmail);
        const updatedAccount: Account = new Account(
            req.body.email ?? accountToUpdate.email,
            req.body.name ?? accountToUpdate.name,
            req.body.amount ?? accountToUpdate.amount,
            req.body.pwd ?? accountToUpdate.pwd
        )
        updatedAccount.update(actualEmail)
        res.status(200).json(updatedAccount.getDisplayableCopy());
    }

    public async deleteAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
        const email = req.params.email;

        const account: Account = new Account(email, email, 5).getDisplayableCopy();
        res.status(200).json(account);
    }

}