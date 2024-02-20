import { useReducer } from "react";
import { useChat } from "ai/react";
import chatReducer from "@/app/utils/reducers/chatReducer";
import insertConversation from "../utils/functions/insertConversation";
import updateConversation from "../utils/functions/updateConversation";
import { supabase } from "../utils/supabase";

export type Message = {
  id: string;
  role: string;
  content: string;
};
export type ChatInitialState = {
  conversationId: string | null;
  messages: Message[];
  userId: string|undefined;
};

function useChatHandlers() {
  const chatInitialState: ChatInitialState = {
    conversationId: null,
    messages: [],
    userId: "",
  };
  const [chatState, dispatch] = useReducer(chatReducer, chatInitialState);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });
  console.log("messages inside useChatHandlers", messages);

  const handleChatSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(event);
    if (chatState.conversationId) {
      console.log("conversationId", chatState.conversationId);
      const data= await updateConversation(messages, chatState.conversationId);
      if(data&&data.length>0){
        const [{ conversation_id, messages }] = data;
        console.log("conversation_id:", conversation_id,"messages:", messages);
        const parsedMessages:Message[] = JSON.parse(messages);
        dispatch({ type: "UPDATE_CHAT_STATE", payload: parsedMessages });
      }
      return;
    }
    const data = await insertConversation(messages);
    if(data&&data.length>0){
      const userId=(await supabase.auth.getSession()).data.session?.user.id;
      const [{ conversation_id, messages }] = data;
      const parsedMessages:Message[] = JSON.parse(messages);
    console.log("conversation_id:", conversation_id,"messages:", parsedMessages,"userId:",userId);
    dispatch({ type: "SET_CHAT_STATE", payload: { conversationId: conversation_id, messages: parsedMessages, userId: userId } }) 


    }

  };
  return {
    chatState,
    dispatch,
    handleChatSubmit,
    handleInputChange,
    input,
  };
}
export default useChatHandlers;
