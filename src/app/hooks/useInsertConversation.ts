import { supabase } from "../utils/supabase";
import { Message } from "./useChatHandlers";

function useInsertConversation() {
  // const { messages } = useChat({
  //   api: "/api/chat",
  // });

  const insertConversation = async (messages:Message[]) => {
    try {

      console.log("inserting messages", messages);
      if(messages.length===0){
        console.log("No messages to insert");
        return;
      }
      const messagesJSON = JSON.stringify(messages);
      console.log("messagesJSON", messagesJSON);
      const { data, error } = await supabase
        .from("conversations")
        .insert([{ messages: messagesJSON }])
        .select();
      console.log("data", data);
      if (Array.isArray(data)) {
        if (error) {
          throw new Error(error.message);
        }

        // const [{ conversation_id,messages }] = data;
        // console.log("conversationId", conversation_id);
        // console.log("messages inside useInsertConversation", messages);

        //   dispatch({ type: "SET_CONVERSATION_ID", payload: conversation_id });
        //   dispatch({ type: "SET_MESSAGES", payload: messages });
        return data;
      }
    } catch (error) {
      console.error("Error inserting conversation", error);
    }
  };
  return { insertConversation};
}
export default useInsertConversation;
