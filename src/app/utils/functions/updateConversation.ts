import { supabase } from "../supabase";
import { Message } from "@/app/hooks/useChatHandlers";

const updateConversation = async (messages:Message[],currentConversationId:string) => {
    try {
        console.log("updateConversation", messages);
      const messagesJSON = JSON.stringify(messages);
      const { data, error } = await supabase
        .from("conversations")
        .update({ messages: messagesJSON })
        .eq("conversation_id", currentConversationId)
        .select();
      console.log("data", data);
      console.log("Error", error);
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error("Error updating conversation", error);
    }
  };
  export default updateConversation;