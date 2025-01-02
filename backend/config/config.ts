import * as dotenv from "dotenv";
dotenv.config();

type EnvKeysType = Readonly<{
    GROQ_API_KEY: string | undefined;
    SESSION_SECRET: string | undefined;
}>;

export const EnvKeys: EnvKeysType = {
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    SESSION_SECRET: process.env.SESSION_SECRET,
};