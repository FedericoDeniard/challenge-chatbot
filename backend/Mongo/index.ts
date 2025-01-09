import { MongoClient } from "mongodb";
import { EnvKeys } from "../config/config.js";

const uri = EnvKeys.MONGO_URI;
if (!uri) {
    throw new Error("MONGO_URI is not defined");
}
export const client = new MongoClient(uri);
await client.connect();
export const dbSushi = client.db("sushi");
