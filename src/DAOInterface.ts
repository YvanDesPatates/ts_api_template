import {DBModelInterface} from "./DBModelInterface";

export interface DAOInterface<T extends DBModelInterface> {
    getAll(): T[];

    getById(id: string): T | null

    create(newElement: T): T;

    delete(id: string): boolean;

    idExists(id: string): boolean;
}