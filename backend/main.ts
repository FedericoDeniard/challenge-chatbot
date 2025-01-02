import { EnvKeys } from './config/config.js';
import express from 'express';
import type { Request, Response } from 'express';
import { Chat, LiveChat } from './Groq/liveChat.js';
import cors from 'cors';
import session, { SessionData } from 'express-session';
import { ChatCompletionMessageParam } from 'groq-sdk/resources/chat/completions.mjs';

declare module 'express-session' {
    interface SessionData {
        history: Array<ChatCompletionMessageParam>
    }
}

const app = express();
app.use(session({
    secret: EnvKeys.SESSION_SECRET || "",
    saveUninitialized: false,
    resave: false,
    cookie: {
        httpOnly: true,
        secure: false
    },
    name: 'groq-session'
}))
app.use(cors({ credentials: true, origin: 'http://localhost:5174' }));
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
    if (!req.session.history) {
        req.session.history = []
    }
    const response = await Chat({ chatEntry: { user: "user", message: prompt, chatHistory: req.session.history } });
    req.session.history.push({ role: "assistant", content: response })
    res.json(response);
})
