import {DBModelInterface} from "./DBModelInterface";

export interface DAOInterface<T extends DBModelInterface> {
    getAll(): Promise<T[]>;

    getById(id: string): Promise<T>

    create(newElement: T): Promise<T>;

    update(id: string, updated: T): Promise<T>

    delete(id: string): Promise<boolean>;

    idExists(id: string): Promise<boolean>;
}