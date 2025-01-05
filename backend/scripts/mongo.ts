import { MongoClient } from "mongodb";

const MenuList = [{
    name: 'Sushi clásico',
    price: 10,
    description: 'Rollo de salmón, atún, alga marina y arroz'
},
{
    name: 'Sushi especial',
    price: 15,
    description: 'Rollo de salmón, atún, alga marina, pepino y arroz'
},
{
    name: 'Sashimi',
    price: 12,
    description: 'Tiras de pescado crudo'
},
{
    name: 'Maki',
    price: 8,
    description: 'Rollo de arroz y alga marina'
},
{
    name: 'Uramaki',
    price: 10,
    description: 'Rollo de arroz, alga marina y pepino'
},
{
    name: 'Rollito',
    price: 12,
    description: 'Rollo de arroz, alga marina, pepino y salmón'
},
{
    name: 'Nigiri',
    price: 8,
    description: 'Pez crudo sobre una base de arroz'
},
{
    name: 'Temaki',
    price: 10,
    description: 'Rollo de arroz, alga marina y salmón en forma de cono'
},
{
    name: 'Sashimi de salmón',
    price: 12,
    description: 'Tiras de salmón crudo'
},
{
    name: 'Sashimi de atún',
    price: 10,
    description: 'Tiras de atún crudo'
}
]

const uploadMenu = async () => {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const dbSushi = client.db("sushi");
        await dbSushi.collection("menu").insertMany(MenuList)
    } catch (error) {
        console.log(error)
    } finally {
        await client.close();

    }
}

uploadMenu()