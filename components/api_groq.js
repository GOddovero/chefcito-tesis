import Groq from "groq-sdk";

const groq = new Groq({ apiKey: "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"});

export async function main() {
  const chatCompletion = await getGroqChatCompletion();
  console.log(chatCompletion.choices[0]?.message?.content || "");
}

prompt_Chefcito="Generame 3 recetas con nombre y una pequeña descripcion"

export async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt_Chefcito,
      },
    ],
    model: "llama3-70b-8192",
  });
}
