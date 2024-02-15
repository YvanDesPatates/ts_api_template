export interface DAOInterface<T> {
    getAll(): T[];

    getById(id: string): T;

    create(newElement: T): T;

    update(id: string, newElement: T): T;

    delete(id: string): void;
}