import * as fs from "fs";
import {DisplayableJsonError} from "./displayableErrors/DisplayableJsonError";
import {DAOInterface} from "./DAOInterface";

export abstract class JsonDAO<T> implements DAOInterface<T>{
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

    //#region public methods
    public getAll(): T[] {
        try {
            const result =  fs.readFileSync(this.getFilePath(), 'utf8');
            return JSON.parse(result);
        } catch (err) {
            if (err instanceof SyntaxError){
                throw new DisplayableJsonError(500, "Database error : Error parsing file, check file integrity, your data may not follow a correct Json Syntax");
            }
            throw new DisplayableJsonError(500, "Database error : Error reading file");
        }
    }

    public getById(id: string): T {
        let elements = this.getAll();
        const element = elements.find((element) => {return this.compareElementToId(element, id)});
        if (!element){ throw new DisplayableJsonError(404, "Element not found"); }
        return element;
    }

    public create(newElement: T): T {
        let elements = this.getAll();
        elements.push(newElement);
        fs.writeFileSync(this.getFilePath(), JSON.stringify(elements));
        return newElement;
    }

    private getFilePath(): string {
        return this.commonPath + this.getFileName();
    }

    public update(id: string, newElement: T): T {
        //todo
        return newElement;
    }

    public delete(id: string): void {
        //todo
    }
    //#endregion

}