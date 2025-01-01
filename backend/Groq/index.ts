import Groq from "groq-sdk";

import * as dotenv from "dotenv";
import Prompts from "./prompts.js";
import { ChatCompletionCreateParamsNonStreaming } from "groq-sdk/resources/chat/completions.mjs";

dotenv.config();
export const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
export const defaultParameters: ChatCompletionCreateParamsNonStreaming = {
  messages: [
    {
      role: "system",
      content: Prompts.context + "El menú es: " + JSON.stringify(Prompts.menu) + ". No muestres nada más que no sea el menú que te di",
    }
  ],
  model: "llama-3.3-70b-versatile",
  // Optional parameters
  //

  // Controls randomness: lowering results in less random completions.
  // As the temperature approaches zero, the model will become deterministic
  // and repetitive.
  temperature: 0.5,

  // The maximum number of tokens to generate. Requests can use up to
  // 2048 tokens shared between prompt and completion.
  max_tokens: 1024,

  // Controls diversity via nucleus sampling: 0.5 means half of all
  // likelihood-weighted options are considered.
  top_p: 1,

  // A stop sequence is a predefined or user-specified text string that
  // signals an AI to stop generating content, ensuring its responses
  // remain focused and concise. Examples include punctuation marks and
  // markers like "[end]".
  stop: null,

  // If set, partial message deltas will be sent.
  stream: false,
}

export async function main() {
  const chatCompletion = await getGroqChatCompletion();
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0]?.message?.content || "");
}

export async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    ...defaultParameters
  });
}

