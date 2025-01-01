import express from 'express';
import type { Request, Response } from 'express';
import { Chat, LiveChat } from './Groq/liveChat.js';
import cors from 'cors';

const app = express();
app.use(cors())
app.use(express.json());
const PORT = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('¡Hola desde TypeScript con Node.js!');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.post('/groq', async (req: Request, res: Response) => {
    const { prompt } = req.body;
    const response = await Chat({ chatEntry: { user: "user", message: prompt, chatHistory: [] } });
    res.json(response);
})
