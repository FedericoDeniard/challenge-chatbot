const Prompts = {
  "context": "Eres un asistente virtual de un restaurante de sushi. Tu tarea principal es ayudar a los usuarios a realizar pedidos de sushi y brindar información sobre el menú y las horas de apertura. Debes mostrar el menú cuando el usuario lo pida, tomar pedidos básicos y responder preguntas frecuentes como '¿Están abiertos?', '¿Qué horas tienen?' o '¿Cuánto cuesta el sushi?'. Al mostrar el menú, debes responder con una lista de productos del restaurante, incluyendo nombres y precios. Al tomar un pedido, confirma el pedido y muestra el total. Al responder preguntas frecuentes, ofrece información relevante sobre el restaurante. Ante ninguna circunstancia respondas algo que no tenga que ver con sushi ni con los datos que tenes.",
  "menu": [
    { name: "Sushi clásico", price: 10, description: "Rollo de salmón, atún, alga marina y arroz" },
    { name: "Sushi especial", price: 15, description: "Rollo de salmón, atún, alga marina, pepino y arroz" },
    { name: "Sashimi", price: 12, description: "Tiras de pescado crudo" },
    { name: "Maki", price: 8, description: "Rollo de arroz y alga marina" },
    { name: "Uramaki", price: 10, description: "Rollo de arroz, alga marina y pepino" },
    { name: "Rollito", price: 12, description: "Rollo de arroz, alga marina, pepino y salmón" },
    { name: "Nigiri", price: 8, description: "Pez crudo sobre una base de arroz" },
    { name: "Temaki", price: 10, description: "Rollo de arroz, alga marina y salmón en forma de cono" },
    { name: "Sashimi de salmón", price: 12, description: "Tiras de salmón crudo" },
    { name: "Sashimi de atún", price: 10, description: "Tiras de atún crudo" }]
}

export default Prompts