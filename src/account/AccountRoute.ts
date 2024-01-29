import express, {Router} from "express";
import {AccountController} from "./AccountController";
import {asyncWrapper} from "../displayableErrors/asyncWrapperErrorCatchingMiddleware";

export class AccountRoute {
    private readonly router: Router = express.Router();
    private readonly accountController: AccountController;


    constructor() {
        this.accountController = new AccountController();
        this.routes();
    }

    getRouter() {
        return this.router;
    }

    private routes(): void {

        this.router.get(
            "/",
            asyncWrapper(this.accountController.getAllAccounts, this.accountController));

        this.router.get(
            '/:id',
            asyncWrapper(this.accountController.getAccountById, this.accountController));

        this.router.post(
            '/',
            asyncWrapper(this.accountController.createAccount, this.accountController));

        this.router.put(
            '/:id',
            asyncWrapper(this.accountController.updateAccount, this.accountController));

        this.router.delete(
            '/:id',
            asyncWrapper(this.accountController.deleteAccount, this.accountController));
    }
}