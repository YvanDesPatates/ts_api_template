import * as fs from "fs";
import {DisplayableJsonError} from "./displayableErrors/DisplayableJsonError";
import {DAOInterface} from "./DAOInterface";
import {DBModelInterface} from "./DBModelInterface";

export abstract class JsonDAO<T extends DBModelInterface> implements DAOInterface<T>{
    private commonPath: string = "data/";

    //create file and data repository if not exists
    public constructor() {
        if (!fs.existsSync(this.commonPath)){
            fs.mkdirSync(this.commonPath);
        }
        if (!fs.existsSync(this.getFilePath())){
            fs.writeFileSync(this.getFilePath(), JSON.stringify([]));
        }
    }

    protected abstract getFileName(): string;

    protected abstract compareElementToId(element: T, id: string): boolean;

    protected abstract parseAnyFromDB(objectToParse: any): T;

    //#region public methods
    public getAll(): T[] {
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

    public getById(id: string): T | null{
        return this.searchElementThrowExceptionIfNotFound(this.getAll(), id);
    }

    public create(newElement: T): T {
        let elements = this.getAll();
        elements.push(newElement);
        fs.writeFileSync(this.getFilePath(), JSON.stringify(elements));
        return newElement;
    }

    public delete(id: string): boolean {
        let elements = this.getAll();
        const element = this.searchElementThrowExceptionIfNotFound(elements, id);
        if (!element){ return false; }

        const indexToDelete = elements.indexOf(element);
        elements.splice(indexToDelete, 1);
        fs.writeFileSync(this.getFilePath(), JSON.stringify(elements));
        return true;
    }

    public idExists(id: string): boolean {
        const elements = this.getAll();
        return elements.some((element) => {return this.compareElementToId(element, id)});
    }
    //#endregion

    //#region private methods
    private getFilePath(): string {
        return this.commonPath + this.getFileName();
    }

    private searchElementThrowExceptionIfNotFound(elements: T[], id: string): T | null{
        const element = elements.find((element) => {return this.compareElementToId(element, id)});
        if (!element){ return null; }
        return element;
    }
    //#endregion



}