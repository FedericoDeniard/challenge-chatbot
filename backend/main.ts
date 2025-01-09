import { EnvKeys } from './config/config.js';
import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import { Chat } from './Groq/liveChat.js';
import cors from 'cors';
import session from 'express-session';
import { errorHandler } from './middlewares/index.js';
import { ChatCompletionAssistantMessageParam } from 'groq-sdk/src/resources/chat/completions.js';

declare module 'express-session' {
    interface SessionData {
        history: Array<ChatCompletionAssistantMessageParam>
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
app.use(cors({ credentials: true, origin: EnvKeys.FRONTEND_URI || "http://localhost:5173" }));
app.use(express.json());
app.use(errorHandler)
const PORT = 3000;


app.post('/groq', async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { prompt } = req.body;
        if (!req.session.history) {
            req.session.history = []
        }
        const response = await Chat({ chatEntry: { user: "user", message: prompt, chatHistory: req.session.history } });
        if (response.success && "data" in response) {
            req.session.history.push({ role: "assistant", content: response.data })
            res.status(response.status).json(response);
        } else {
            res.status(response.status).json(response);
        }
    } catch (e) {
        next(e)
    }
})

export default app;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
