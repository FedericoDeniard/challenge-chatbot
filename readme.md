# Chatbot Sushi

## Funciones del chatbot

- Mostrar el menú

- Tomar pedidos básicos

- Responder preguntas frecuentes

## Tecnologías usadas

- Node.js

- React.js

- MongoDb

- Groq (Interfaz para uso de LLM)

- TypeScript

- Express

## Configuración del Proyecto

### Dependencias

- MongoDB para desarrollo local

### Instalación del proyecto

```bash

$  npm  install

```

### Cargar menú de prueba

```bash

$  npm  run  scripts

```

### Levantar el proyecto en local

Desde la carpeta raíz.

```bash

$  sudo  systemctl  start  mongod

```

```bash

$  npm  run  start

```

### Variables de entorno

En la carpeta /backend

- **GROQ_API_KEY** (Clave del cliente de Groq) https://console.groq.com/keys

- **SESSION_SECRET** (Clave para la sesión de express, recomiendo generarla con el siguiente comando)

```bash

$  node  -e  "console.log(require('crypto').randomBytes(16).toString('hex'))"

```

- **FRONTEND_URI** (La URL donde se aloja el frontend, necesario para el _CORS_, por defecto se aloja en el puerto 5173)

- **MONGO_URI** (La URL de la base de datos, por defecto se aloja en el puerto 27017)

### Endpoints disponibles

**/groq**: Recibe un prompt en el body que será enviado a la API de groq, devuelve un status junto a un objeto con la respuesta.

### Errores manejados

- **MongoServerSelectionError**: La base de datos no está ejecutándose

- **GroqApiError**: Se manejan errores que pueda causar Groq, como por ejemplo, la falta de tokens.

### Funcionamiento del bot

El objetivo del bot es guiar al usuario para que pueda realizar un pedido. Para lograr esto, obtiene el menú desde la base de datos. Además, es capaz de responder al usuario si el local se encuentra abierto o no, ya que en cada llamado a la API, se le brinda al bot la hora actual. El bot no responderá ninguna pregunta que no este relacionado con estos objetivos ni tampoco brindará información que no tenga. Por último, el bot le pedirá al usuario un teléfono y una dirección para enviar el pedido, en caso de no tener esta información, el mismo no confirmará el pedido.

### Consideraciones

- Por el momento el bot almacena el historial de chat en el servidor (utilizando express-session), pero lo ideal sería guardar el historial del chat en la base de datos de usuarios.
- El bot le pide al usuario teléfono y dirección para enviar el pedido, pero debería ser enviado desde la base de datos de los usuarios registrados.
