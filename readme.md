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

- MongoDB para desarollo local

### Instalación del proyecto

```bash
$  npm  install
```

### Cargar menu de prueba

```bash
$ npm run scripts
```

### Levantar el proyecto en local

Desde la carpeta raíz.

```bash
$  sudo systemctl start mongod
```

```bash
$  npm  run  start
```

### Variables de entorno

En la carpeta /backend

- **GROQ_API_KEY** (Clave del cliente de Groq) https://console.groq.com/keys
- **SESSION_SECRET** (Clave para la sesión de express, recomiendo generarla con el siguiente comando)

```bash
$  node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

- **FRONTEND_URI** (La URL donde se aloja el frontend, necesario para el _CORS_, por defecto se aloja en el puerto 5173)
- **MONGO_URI** (La URL de la base de datos, por defecto se aloja en el puerto 27017)

### Errores manejados

- **MongoServerSelectionError**: La base de datos no está ejecutandose
- **GroqApiError**: Se manejan errores que pueda causar Groq, como por ejemplo, la falta de tokens.
