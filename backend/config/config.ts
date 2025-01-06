import * as dotenv from "dotenv";
import { ObjectId } from "mongodb";
import { dbSushi } from "../Mongo/index.js";
dotenv.config();

type EnvKeysType = Readonly<{
    GROQ_API_KEY: string | undefined;
    SESSION_SECRET: string | undefined;
    FRONTEND_URI: string | undefined;
}>;

export const EnvKeys: EnvKeysType = {
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    SESSION_SECRET: process.env.SESSION_SECRET,
    FRONTEND_URI: process.env.FRONTEND_URI
};

type Menu = Readonly<{
    _id: ObjectId;
    name: string;
    price: number;
    description: string;
}>

export const MenuList: Menu[] = await dbSushi.collection<Menu>("menu").find({}).toArray();