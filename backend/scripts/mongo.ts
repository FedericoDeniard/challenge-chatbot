import { disconnectMongo, getDb } from "../Mongo/index.ts";

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
    const db = await getDb()
    console.log("Cargando menu...")
    try {

        await db.collection("menu").insertMany(MenuList)
        console.log("Menu cargado con éxito")
    } catch (error) {
        console.error("Error al cargar el menu:", error)

    } finally {
        await disconnectMongo()

    }
}

await uploadMenu()