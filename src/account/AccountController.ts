import {NextFunction, Request, Response} from "express";
import {AccountLogic} from "./AccountLogic";

export class AccountController {

    public async getAllAccounts(req: Request, res: Response, next: NextFunction): Promise<void> {
        const accounts: AccountLogic[] = await AccountLogic.getAll();
        res.status(200).json(accounts);
    }

    public async getAccountById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const email = req.params.email;
        const account: AccountLogic = await AccountLogic.getAccount(email);
        res.status(200).json(account);
    }

    public async createAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
        const accountToCreate: AccountLogic = new AccountLogic(req.body.email, req.body.name, req.body.amount, req.body.pwd);
        res.status(201).json(await accountToCreate.create());
    }

    public async updateAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
        const actualEmail:string = req.params.email;
        const accountToUpdate: AccountLogic = await AccountLogic.getAccount(actualEmail);
        const updatedAccount: AccountLogic = new AccountLogic(
            req.body.email ?? accountToUpdate.email,
            req.body.name ?? accountToUpdate.name,
            req.body.amount ?? accountToUpdate.amount,
            req.body.pwd ?? accountToUpdate.pwd
        );
        await updatedAccount.update(actualEmail);
        res.status(200).json(updatedAccount);
    }

    public async deleteAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
        const email = req.params.email;
        const account: AccountLogic = new AccountLogic(email, email, 5);
        await account.delete();
        res.status(200).json(account);
    }

}