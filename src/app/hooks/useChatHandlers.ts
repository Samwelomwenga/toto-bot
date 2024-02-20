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
  userId: string;
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
      const data= await updateConversation(messages, chatState.conversationId);
      if(data&&data.length>0){
        const [{ conversation_id, messages }] = data;
        console.log("conversation_id:", conversation_id,"messages type:",typeof messages);
      }
      return;
    }
    const data = await insertConversation(messages);
    if(data&&data.length>0){
      const [{ conversation_id, messages }] = data;
    console.log("conversation_id:", conversation_id,"messages type:",typeof messages);
    }

    // dispatch({ type: "SET_CONVERSATION_ID", payload: conversation_id });
  };
  // console.log("chatState before return", chatState);
  return {
    chatState,
    dispatch,
    handleChatSubmit,
    handleInputChange,
    input,
  };
}
export default useChatHandlers;
