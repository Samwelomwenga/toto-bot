import { supabase } from "../supabase";
import { Message } from "@/app/hooks/useChatHandlers";

const updateConversation = async (messages: Message[], currentConversationId: string) => {
  try {
    console.log("updateConversation", messages);
    console.log("currentConversationId", currentConversationId)
    const userUId = (await supabase.auth.getSession()).data.session?.user.id;
    const messagesJSON = JSON.stringify(messages);
    const { data, error, status, statusText } = await supabase
      .from("conversations")
      .update({ messages: messagesJSON, "User UID": userUId})
      .eq("conversation_id", currentConversationId)
      .select();
    console.log("new data", data);
    console.log("Error", error);
    console.log("Status", status);
    console.log("status Text", statusText)
    if (error) {
      throw new Error(error.message);
    }
    return data as Conversation[];
  } catch (error) {
    console.error("Error updating conversation", error);
  }
};
export default updateConversation;