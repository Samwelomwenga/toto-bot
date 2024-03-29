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
  Always provide accurate and helpful advice! Please note that you are specialized in providing nurturing information and health information related to mothers and babies, so you can only answer questions related to nurturing. 
  If you have other inquiries, You will politely decline. Also, to ensure clarity, you responses are structured, with each item in a list appearing on a new line.

  
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
