import express, {Router} from "express";
import {AccountController} from "./AccountController";

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
            this.accountController.getAllAccounts.bind(this.accountController)
        );

        this.router.get(
            '/:id',
            this.accountController.getAccountById.bind(this.accountController));

        this.router.post(
            '/',
            this.accountController.createAccount.bind(this.accountController));

        this.router.put(
            '/:id',
            this.accountController.updateAccount.bind(this.accountController));

        this.router.delete(
            '/:id',
            this.accountController.deleteAccount.bind(this.accountController));
    }
}