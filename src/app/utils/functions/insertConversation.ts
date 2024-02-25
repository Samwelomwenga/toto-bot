import { Message } from "@/app/hooks/useChatHandlers";
import { supabase } from "../supabase";

const insertConversation = async (messages: Message[]) => {
  try {
    console.log("inserting messages", messages);
    if (messages.length === 0) {
      console.log("No messages to insert");
      return;
    }
    const userUId = (await supabase.auth.getSession()).data.session?.user.id;
    const messagesJSON = JSON.stringify(messages);
    console.log("messagesJSON", messagesJSON);
    const { data, error } = await supabase
      .from("conversations")
      .insert([{ messages: messagesJSON, "User UID": userUId }])
      .select();
    if (data) {
      console.log("Supabase Data", JSON.parse(data[0].messages));
    }

    if (Array.isArray(data)) {
      if (error) {
        throw new Error(error.message);
      }

      return data as Conversation[];
    }
  } catch (error) {
    console.error("Error inserting conversation", error);
  }
};
export default insertConversation;
