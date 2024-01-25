import { getDocuments } from "./getDocuments";
import { openai } from "@/app/utils/openai";
import { supabase } from "@/app/utils/supabase";

export async function generateEmbeddings() {
  const documents = await getDocuments(); // Your custom function to load docs
  console.log(`Generating embeddings for ${documents.length} documents of type ${typeof documents}`);
  for (const document of documents)  {
    const input = document.pageContent.replace(/\n/g, " ");
    try {
      const embeddingResponse = await (
        await openai.createEmbedding({
          model: "text-embedding-ada-002",
          input,
        })
        ).json();
        console.log("embeddingResponse", embeddingResponse);
      const [{ embedding }] = embeddingResponse.data;
      // In production we should handle possible errors
      await supabase.from("documents").insert({
        content: input,
        embedding,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

generateEmbeddings();
