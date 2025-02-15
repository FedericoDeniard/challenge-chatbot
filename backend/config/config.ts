import * as dotenv from "dotenv";
dotenv.config({ path: '../.env' });
dotenv.config({ path: './backend/.env' });
dotenv.config({ path: './.env' });
dotenv.config();


type EnvKeysType = Readonly<{
    GROQ_API_KEY: string | undefined;
    SESSION_SECRET: string | undefined;
    FRONTEND_URI: string | undefined;
    MONGO_URI: string | undefined;
    PRODUCTION: boolean
}>;

export const EnvKeys: EnvKeysType = {
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    SESSION_SECRET: process.env.SESSION_SECRET,
    FRONTEND_URI: `http://localhost:${process.env.VITE_PORT}`,
    MONGO_URI: process.env.MONGO_URI,
    PRODUCTION: process.env.NODE_ENV === "production"

};