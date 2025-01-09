import { ObjectId } from "mongodb";
import { disconnectMongo, getDb } from "../Mongo/index.js";

type Menu = Readonly<{
    _id: ObjectId;
    name: string;
    price: number;
    description: string;
}>


export const MenuList: Menu[] = await (async () => {
    const db = await getDb();
    const menuList = await db.collection<Menu>("menu").find({}).toArray();
    await disconnectMongo();
    return menuList;
})();
