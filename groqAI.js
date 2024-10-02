import Groq from "groq-sdk";

const apiKey = "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";
const groq = new Groq({ apiKey: apiKey, dangerouslyAllowBrowser: true });

export async function getGroqChatCompletion(prompt) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You give at least 5 food recipes but brief",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama3-8b-8192",
  });
}
