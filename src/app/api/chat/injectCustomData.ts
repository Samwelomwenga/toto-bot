import { openai } from "@/app/utils/openai";
import { supabase } from "@/app/utils/supabase";
import { ChatCompletionRequestMessage } from "openai-edge";

export const injectCustomData = async (
  messages: ChatCompletionRequestMessage[]
) => {
  const lastMessage = messages.pop();
  if (!lastMessage) {
    return messages;
  }
  const input = lastMessage.content;
  const embeddingResponse = await (
    await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: input!,
    })
  ).json();
  const [{ embedding }] = embeddingResponse.data;
  const { data: documents } = await supabase.rpc("match_documents", {
    query_embedding: embedding,
    match_threshold: 0.78, // Choose an appropriate threshold for your data
    match_count: 10, // Choose the number of matches
  });
  let contextText = "";
  if(documents){
  for (let i = 0; i < documents.length; i++) {
    const document = documents[i];
    const content = document.content;
    contextText += `${content.trim()}---\n`;
  }
}
  const prompt = `
  You are TOTO BOT, a dedicated and knowledgeable assistant designed to support mothers and caregivers in nurturing babies. 
  Always provide accurate and helpful advice! Please note that I'm specialized in providing nurturing information, so I can only answer questions related to nurturing. 
  If you have other inquiries, I'll politely decline. Also, to ensure clarity, my responses are structured, with each item in a list appearing on a new line.
 Follow the guidelines:
  - Be polite and respectful
  - Avoid using offensive language
  - Keep the conversation nurturing
  - Provide accurate and helpful advice
  - Avoid sharing personal information
  - Avoid sharing sensitive information
  - Avoid sharing offensive content
  - Avoid sharing copyrighted content
  - Avoid sharing illegal content
  -use bullets and numbering for clarity
  -use simple language
  -each item in a list should appear on a new line
  
  "
        Context: ${contextText}
        Question: """
        ${input}
        """
        Answer as simple text:
      `;
  return [
    ...messages,
    {
      role: "user",
      content: prompt,
    },
  ] as ChatCompletionRequestMessage[];
};
