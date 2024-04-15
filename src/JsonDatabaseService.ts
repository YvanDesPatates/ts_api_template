import * as fs from "fs";
import {DisplayableJsonError} from "./displayableErrors/DisplayableJsonError";
import {DBModelInterface} from "./DBModelInterface";

export class JsonDatabaseService<T extends DBModelInterface>{
    private readonly commonPath: string;
    private readonly fileName: string;

    private readonly compareElementToId: CallbackFunctionCompareElementToId<T>;
    private readonly parseAnyFromDB: CallbackFunctionParseAnyFromDB<T>;

    //create file and data repository if not exists
    public constructor(fileName: string, callbackFunctionCompareElementToId: CallbackFunctionCompareElementToId<T>, callbackFunctionParseAnyFromDB: CallbackFunctionParseAnyFromDB<T>) {
        this.fileName = fileName;
        this.compareElementToId = callbackFunctionCompareElementToId;
        this.parseAnyFromDB = callbackFunctionParseAnyFromDB;

        if ( !process.env.JSON_DATA_BASE_PATH){
            throw new DisplayableJsonError(500, "JSON_DATA_BASE_PATH variable environment is missing");
        }
        this.commonPath = process.env.JSON_DATA_BASE_PATH;

        if (!fs.existsSync(this.commonPath)){
            fs.mkdirSync(this.commonPath);
        }
        if (!fs.existsSync(this.getFilePath())){
            fs.writeFileSync(this.getFilePath(), JSON.stringify([]));
        }
    }

    //#region public methods
    public async getAll(): Promise<T[]> {
        try {
            const result =  fs.readFileSync(this.getFilePath(), 'utf8');
            return JSON.parse(result).map( (jsonObject: any) => this.parseAnyFromDB(jsonObject) );
        } catch (err) {
            if (err instanceof SyntaxError){
                throw new DisplayableJsonError(500, "Database error : Error parsing file, check file integrity, your data may not follow a correct Json Syntax");
            }
            throw new DisplayableJsonError(500, "Database error : Error reading file");
        }
    }

    public async getById(id: string): Promise<T>{
        const element = this.searchElementThrowExceptionIfNotFound(await this.getAll(), id);
        if (!element){
            throw new DisplayableJsonError(500, "resource not found in database with id : "+id);
        }
        return element
    }

    public async create(newElement: T): Promise<T> {
        const elements = await this.getAll();
        elements.push(newElement);
        fs.writeFileSync(this.getFilePath(), JSON.stringify(elements));
        return newElement;
    }

    public async delete(id: string): Promise<boolean> {
        const elements = await this.getAll();
        const element = await this.searchElementThrowExceptionIfNotFound(elements, id);
        if (!element){ return false; }

        const indexToDelete = elements.indexOf(element);
        elements.splice(indexToDelete, 1);
        fs.writeFileSync(this.getFilePath(), JSON.stringify(elements));
        return true;
    }

    public async idExists(id: string): Promise<boolean> {
        const elements = await this.getAll();
        return elements.some((element) => this.compareElementToId(element, id) );
    }
    //#endregion

    //#region private methods
    private getFilePath(): string {
        return this.commonPath + this.fileName;
    }

    private searchElementThrowExceptionIfNotFound(elements: T[], id: string): T | null{
        const element = elements.find((element) => this.compareElementToId(element, id) );
        if (!element){ return null; }
        return element;
    }
    //#endregion

}

interface CallbackFunctionCompareElementToId<T> {
    (element: T, id: string): boolean;
}

interface CallbackFunctionParseAnyFromDB<T> {
    (objectToParse: any): T;
}