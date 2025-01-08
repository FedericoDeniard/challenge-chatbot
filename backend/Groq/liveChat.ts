import { defaultParameters, groq } from "./index.js"
import readline from "readline";
import { dbSushi } from "../Mongo/index.js";
import { ChatCompletionMessageParam } from "groq-sdk/src/resources/chat/completions.js";
import { APIError as GroqAPIError } from "groq-sdk";
import { CustomSuccesfullResponse, CustomErrorResponse } from "../types/responses.js";

// export const LiveChat = async () => {
//     const groqClient = groq;
//     const chatHistory: Array<ChatCompletionMessageParam> = [];

//     while (true) {
//         const rl = readline.createInterface({
//             input: process.stdin,
//             output: process.stdout,
//         });

//         const userInput: string = await new Promise((resolve) => {
//             rl.question("User: ", (input) => {
//                 rl.close();
//                 resolve(input);
//             });
//         });
//         chatHistory.push({ role: "user", content: userInput });

//         const chatCompletion = await groqClient.chat.completions.create({
//             ...defaultParameters,
//             messages: [...defaultParameters.messages, ...chatHistory]
//         })
//         console.log("Groq: " + chatCompletion.choices[0]?.message?.content || "")
//     }

// }

interface ChatEntry {
    user: string;
    message: string;
    chatHistory: Array<ChatCompletionMessageParam>;
}

export const Chat = async ({ chatEntry }: { chatEntry: ChatEntry }): Promise<CustomSuccesfullResponse<string> | CustomErrorResponse> => {
    if (!chatEntry.message || chatEntry.message.trim().length == 0) {
        return { success: false, error: "Empty message", details: null, status: 400 }

    }
    const groqClient = groq;
    const { chatHistory, message } = chatEntry
    chatHistory.push({ role: "system", content: "La hora actual es: " + new Date().toString() })
    chatHistory.push({ role: "user", content: message })
    try {
    const chatCompletion = await groqClient.chat.completions.create({
        ...defaultParameters,
            messages: [...defaultParameters.messages, ...chatHistory],
            stream: false
    })
        let response = await makeOrder(chatCompletion.choices[0]?.message?.content || "")
        console.log("Groq: " + response)
        return { success: true, data: response, status: 200 }
    } catch (err) {
        let customError = {
            success: false,
            error: "Internal Server Error",
            details: null,
            status: 500
        }
        if (err instanceof GroqAPIError) {
            return {
                success: false,
                error: err.message,
                details: err.name,
                status: err.status
            }
        } else if (err instanceof Error) {
            return { ...customError, error: err.message, details: err.name }
        }
        return customError
    }
}

const makeOrder = async (prompt: string) => {
    let showUser = prompt
    const index = prompt.indexOf("MAKEORDER")
    if (index !== -1) {
        let splittedPrompt = prompt.split("MAKEORDER")
        showUser = splittedPrompt[0]
        console.log("La orden es: " + splittedPrompt[1])
        dbSushi.collection("orders").insertOne(JSON.parse(splittedPrompt[1]))
    }
    return showUser
}