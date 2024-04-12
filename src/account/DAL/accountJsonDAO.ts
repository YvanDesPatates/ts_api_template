import {AccountDBModel} from "./AccountDBModel";
import AccountDaoInterface from "./AccountDaoInterface";
import {JsonDatabaseService} from "../../JsonDatabaseService";

export class AccountJsonDAO implements AccountDaoInterface {
    private jsonDatabaseService: JsonDatabaseService<AccountDBModel>;
    private readonly fileName: string = "accounts.json";

    constructor() {
        this.jsonDatabaseService = new JsonDatabaseService(this.fileName, this.compareElementToId, this.parseAnyFromDB);
    }

    public async create(newElement: AccountDBModel): Promise<AccountDBModel> {
        return this.jsonDatabaseService.create(newElement);
    }

    public async delete(id: string): Promise<boolean> {
        return this.jsonDatabaseService.delete(id);
    }

    public async getAll(): Promise<AccountDBModel[]> {
        return this.jsonDatabaseService.getAll();
    }

    public async getById(id: string): Promise<AccountDBModel | null> {
        return this.jsonDatabaseService.getById(id);
    }

    idExists(id: string): Promise<boolean> {
        return this.jsonDatabaseService.idExists(id);
    }

    //#region private methods for callbacks
    private compareElementToId(element: AccountDBModel, id: string): boolean {
        return element.email === id;
    }

    private parseAnyFromDB(objectToParse: any): AccountDBModel {
        return new AccountDBModel(objectToParse.email, objectToParse.name, objectToParse.amount, objectToParse.pwd);
    }
    //#endregion
}