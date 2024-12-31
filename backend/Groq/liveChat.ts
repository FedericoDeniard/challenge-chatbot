import { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions.mjs";
import { defaultParameters, groq } from "./index.js"
import readline from "readline";

export const LiveChat = async () => {
    const groqClient = groq;
    const chatHistory: Array<ChatCompletionMessageParam> = [];

    while (true) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        const userInput: string = await new Promise((resolve) => {
            rl.question("User: ", (input) => {
                rl.close();
                resolve(input);
            });
        });
        chatHistory.push({ role: "user", content: userInput });

        const chatCompletion = await groqClient.chat.completions.create({
            ...defaultParameters,
            messages: [...defaultParameters.messages, ...chatHistory]
        })
        console.log("Groq: " + chatCompletion.choices[0]?.message?.content || "")
    }

}