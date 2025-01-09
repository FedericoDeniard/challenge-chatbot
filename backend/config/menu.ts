import { ObjectId } from "mongodb";
import { dbSushi } from "../Mongo/index.js";

type Menu = Readonly<{
    _id: ObjectId;
    name: string;
    price: number;
    description: string;
}>

export const MenuList: Menu[] = await dbSushi.collection<Menu>("menu").find({}).toArray();