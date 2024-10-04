import Groq from "groq-sdk";

const apiKey = "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";
const groq = new Groq({ apiKey: apiKey, dangerouslyAllowBrowser: true });

export async function getGroqChatCompletion(search, prompt, split = true) {
  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: search,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama3-8b-8192",
  });

  const content = response.choices?.[0]?.message?.content || "";

  if (split) {
    return content.split(",").map((recipe) => recipe.trim());
  }
  return content;
}
