import * as fs from "fs";
import {DisplayableJsonError} from "./displayableErrors/DisplayableJsonError";

export abstract class JsonDAO<T> {
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

    abstract getFileName(): string;
    public getAll(): T[] {
        try {
            let result =  fs.readFileSync(this.getFileName(), 'utf8');
            return JSON.parse(result);
        } catch (err) {
            if (err instanceof SyntaxError){
                throw new DisplayableJsonError(500, "Database error : Error parsing file, check file integrity, your data may be corrupted");
            }
            throw new DisplayableJsonError(500, "Database error : Error reading file");
        }
    }

    public getById(id: string): T {
        //todo
        return new Object() as T;
    }

    public create(newElement: T): T {
        //todo
        return newElement;
    }

    private getFilePath(): string {
        return this.commonPath + this.getFileName();
    }

}