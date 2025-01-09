import { Db, MongoClient, MongoServerSelectionError } from "mongodb";
import { EnvKeys, MongoOptions } from "../config/config.js";

const uri = EnvKeys.MONGO_URI;
if (!uri) {
    throw new Error("MONGO_URI is not defined");
}
const client = new MongoClient(uri, MongoOptions);

export const getDb = async (): Promise<Db> => {

    try {
await client.connect();
        const db = client.db("sushi")
        return db;
    } catch (error) {
        if (error instanceof MongoServerSelectionError) {
            throw new Error("Error connecting to MongoDB: Server is offline");
        }
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

export const disconnectMongo = async () => {
    try {
        await client.close();
    } catch (error) {
        console.error("Error disconnecting from MongoDB:", error);
    }
}

