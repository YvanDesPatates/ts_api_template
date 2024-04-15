import {DAOInterface} from "./DAOInterface";
import {DBModelInterface} from "./DBModelInterface";
import {Collection, Db, MongoClient, ObjectId} from "mongodb";
import {DisplayableJsonError} from "./displayableErrors/DisplayableJsonError";

export abstract class MongoDAO<T extends DBModelInterface> implements DAOInterface<T> {
    private static client: MongoClient|null = null;
    protected static db: Db|null = null;

    protected abstract parseAnyFromDB(objectToParse: any): T;
    protected abstract getCollection(): Promise<Collection>;

    constructor() {
        if (!MongoDAO.client) {
            if (!process.env.MONGODB_URL) {
                throw new DisplayableJsonError(500, "configuration error, no entry for MONGODB_URL");
            }
            MongoDAO.client = new MongoClient(process.env.MONGODB_URL);
        }
    }

    public async connect(): Promise<void> {
        if (!MongoDAO.client){
            throw new DisplayableJsonError(500, "mongo cliente should be instanciated to connect");
        }
        if (!process.env.MONGODB_DB_NAME){
            throw new DisplayableJsonError(500, "configuration error, no entry for MONGO_DB_NAME");
        }
        if (!MongoDAO.db) {
            await MongoDAO.client.connect();
            MongoDAO.db = MongoDAO.client.db(process.env.MONGODB_DB_NAME);
            return;
        }
        return;
    }

    public async create(newElement: T): Promise<T> {
        await this.connect();
        const collection = await this.getCollection();
        const resultId = await collection.insertOne(newElement);

        const result = this.getById(resultId.insertedId.toString());
        if (!result){
            throw new DisplayableJsonError(500, "error while creating element. Element may be not inserted");
        }
        return result;
    }

    public async update(id: string, updated: T): Promise<T>{
        const collection = await this.getCollection();
        const result = await collection.updateOne(this.getIdFilter(id), { $set: updated });
        if (!result){
            throw new DisplayableJsonError(304, `resource with id ${id} has not been updated`)
        }
        return updated;
    }

    public async delete(id: string): Promise<boolean> {
        try {
            const collection = await this.getCollection();
            const result = await collection.deleteOne(this.getIdFilter(id));
            return result != null;
        } catch (e){
            console.error(e);
            return false;
        }
    }

    public async getAll(): Promise<T[]> {
        const collection = await this.getCollection();
        const result = await collection.find({}).toArray();
        return result.map(result => this.parseAnyFromDB(result));
    }

    public async getById(id: string): Promise<T> {
        const collection = await this.getCollection();
        const filter = this.getIdFilter(id);
        const results = await collection.find(filter).toArray();
        if (results.length === 0){
            throw new DisplayableJsonError(500, "Mongo error, no resource found with id "+id);
        }
        if (results.length > 1){
            throw new DisplayableJsonError(500, "Mongo error, check for database integrity. Many items found in same collection with id: "+id);
        }
        return this.parseAnyFromDB(results[0]);
    }

    public async idExists(id: string): Promise<boolean> {
        const collection = await this.getCollection();
        const result = await collection.findOne(this.getIdFilter(id));
        return result !== null;
    }

    protected getIdFilter(id: string): object {
        const objectId: ObjectId = new ObjectId(id);
        return {_id: objectId};
    }

}