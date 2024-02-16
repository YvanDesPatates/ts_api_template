import {NextFunction, Request, Response} from "express";
import {AccountModel} from "./AccountModel";

export class AccountController {

    public async getAllAccounts(req: Request, res: Response, next: NextFunction): Promise<void> {
        const accounts: AccountModel[] = AccountModel.getAll();
        res.status(200).json(accounts);
    }

    public async getAccountById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const email = req.params.email;
        const account: AccountModel = AccountModel.getAccount(email);
        res.status(200).json(account);
    }

    public async createAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
        const accountToCreate: AccountModel = new AccountModel(req.body.email, req.body.name, req.body.amount, req.body.pwd);
        res.status(201).json(accountToCreate.create());
    }

    public async updateAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
        const actualEmail:string = req.params.email;
        const accountToUpdate: AccountModel = AccountModel.getAccount(actualEmail);
        const updatedAccount: AccountModel = new AccountModel(
            req.body.email ?? accountToUpdate.email,
            req.body.name ?? accountToUpdate.name,
            req.body.amount ?? accountToUpdate.amount,
            req.body.pwd ?? accountToUpdate.pwd
        )
        updatedAccount.update(actualEmail)
        res.status(200).json(updatedAccount);
    }

    public async deleteAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
        const email = req.params.email;
        const account: AccountModel = new AccountModel(email, email, 5);
        account.delete();
        res.status(200).json(account);
    }

}