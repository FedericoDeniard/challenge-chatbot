import express from 'express';
import type { Request, Response } from 'express';
import { LiveChat } from './Groq/liveChat.js';

const app = express();
const PORT = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('¡Hola desde TypeScript con Node.js!');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

LiveChat()