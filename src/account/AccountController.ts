import {NextFunction, Request, Response} from "express";
import {Account} from "./Account";

export class AccountController {

    public async getAllAccounts(req: Request, res: Response, next: NextFunction): Promise<void> {
            const accounts = [
                {id: "account_1"},
                {id: "account_2"}
            ];
            res.status(200).json(accounts);
    }

    public async getAccountById(req: Request, res: Response, next: NextFunction): Promise<void> {
            const id = Number(req.params.id);
            if (!id) {
                throw new Error("error 400 - missing required param : id")
            }
            const account =
                {
                    id: "account_" + id
                };
            res.status(200).json(account);
    }

    public async createAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
            const accountToCreate: Account = req.body;
            const id = req.params.id;
            const account =
                {
                    id: "account_" + id
                };
            res.status(201).json(account);
    }

    public async updateAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
            const accountToUpdate: Account = req.body;
            const id = req.params.id;
            const account =
                {
                    id: "account_" + id
                };
            res.status(200).json(account);
    }

    public async deleteAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
            const id = req.params.id;
            const account =
                {
                    id: "account_" + id
                };
            res.status(200).json(account);
    }

}