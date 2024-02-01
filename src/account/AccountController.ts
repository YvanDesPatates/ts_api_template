import {NextFunction, Request, Response} from "express";
import {Account} from "./Account";
import {MissingAttributeError} from "../displayableErrors/MissingAttributeError";

export class AccountController {

    public async getAllAccounts(req: Request, res: Response, next: NextFunction): Promise<void> {
        const accounts: Account[] = [
           new Account("account_1", "2"),
            new Account("account_2", "2")
        ];
        res.status(200).json(accounts);
    }

    public async getAccountById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const email = req.params.email;
        const account: Account = new Account(email, "name_of_"+email).getCopyWithoutPwd();
        res.status(200).json(account);
    }

    public async createAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
        const accountToCreate: Account = new Account(req.body.email, req.body.name, req.body.amount, req.body.pwd);
        res.status(201).json(accountToCreate);
    }

    public async updateAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
        const email = req.params.email;

        const accountToUpdate: Account = req.body;
        const account: Account = new Account(email+"updated", "name_of_"+email).getCopyWithoutPwd();
        res.status(200).json(account);
    }

    public async deleteAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
        const email = req.params.email;

        const account: Account = new Account(email, email).getCopyWithoutPwd();
        res.status(200).json(account);
    }

}