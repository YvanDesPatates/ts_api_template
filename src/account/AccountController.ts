import {NextFunction, Request, Response} from "express";
import {Account} from "./Account";
import {MissingRequiredParamError} from "../displayableErrors/MissingRequiredParamError";

export class AccountController {

    public async getAllAccounts(req: Request, res: Response, next: NextFunction): Promise<void> {
        const accounts: Account[] = [
           new Account("account_1", null),
            new Account("account_2", "2")
        ];
        res.status(200).json(accounts);
    }

    public async getAccountById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id = Number(req.params.id);
        this.assertParamExists(id, "id");

        const account: Account = new Account("account_"+id, id.toString()).getCopyWithoutPwd();
        res.status(200).json(account);
    }

    public async createAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
        const accountToCreate: Account = req.body;
        const id = req.params.id;
        const account: Account = new Account("account_"+id, id.toString()).getCopyWithoutPwd();
        res.status(201).json(account);
    }

    public async updateAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id = Number(req.params.id);
        this.assertParamExists(id, "id");

        const accountToUpdate: Account = req.body;
        const account: Account = new Account("account_"+id, id.toString()).getCopyWithoutPwd();
        res.status(200).json(account);
    }

    public async deleteAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id = Number(req.params.id);
        this.assertParamExists(id, "id");

        const account: Account = new Account("account_"+id, id.toString()).getCopyWithoutPwd();
        res.status(200).json(account);
    }

    private assertParamExists(id: number, paramName: string) {
        if (!id) {
            throw new MissingRequiredParamError(paramName);
        }
    }
}