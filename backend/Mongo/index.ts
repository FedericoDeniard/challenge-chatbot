import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
await client.connect();
export const dbSushi = client.db("sushi");
