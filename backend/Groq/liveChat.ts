import { defaultParameters, groq } from "./index.ts"
import { APIError as GroqAPIError } from "groq-sdk";
import { disconnectMongo, getDb } from "../Mongo/index.ts";
import { MongoServerSelectionError, ObjectId } from "mongodb";
import { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions.mjs";
import { CustomErrorResponse, CustomSuccesfullResponse } from "../types/responses.ts";
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
        // let response = await makeOrder(`Su pedido a sido confirmado <br> MAKEORDER {"products": ["67811c731e05e5012f5a23a1"], "quantity": [3], "total": 30, "phone": "+5412122323", "address": "asdasd 1245 a"}`)
        return { success: true, data: response, status: 200 }
    } catch (err) {
        console.log(err)
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
        }
        else if (err instanceof MongoServerSelectionError) {
            return {
                success: false,
                error: "Error connecting to MongoDB: Server is offline",
                details: err.name,
                status: 504
            }
        }
        else if (err instanceof Error) {
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
        try {
            let db = await getDb()
            let formattedData = JSON.parse(splittedPrompt[1])
            if (formattedData.products && Array.isArray(formattedData.products)) {
                formattedData.products = formattedData.products.map((id: string) => new ObjectId(id))
            }
            await db.collection("orders").insertOne(formattedData)
            await disconnectMongo()
            showUser = "Su pedido a sido confirmado"
        }
        catch (error) {
            console.log(error)
            showUser = "Su pedido no pudo ser confirmado"
        }
    }
    return showUser
}