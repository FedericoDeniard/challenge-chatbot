import { defaultParameters, groq } from "./index.js"
import readline from "readline";
import { dbSushi } from "../Mongo/index.js";
import { CustomError } from "../middlewares/index";
import { ChatCompletionMessageParam } from "groq-sdk/src/resources/chat/completions.js";

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

export const Chat = async ({ chatEntry }: { chatEntry: ChatEntry }) => {
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
        return { success: true, data: response }
    } catch (e: unknown) {
        const error = e as CustomError
        console.log(e)
        return {
            success: false,
            error: error.message || "Internal Server Error",
            details: error.details || null
        }
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